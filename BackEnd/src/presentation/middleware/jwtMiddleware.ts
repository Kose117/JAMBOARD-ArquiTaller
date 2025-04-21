import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../infrastructure/config";

// Roles permitidos en toda la aplicación
const VALID_ROLES = ["ADMIN", "OPERATOR"] as const;
type ValidRole = (typeof VALID_ROLES)[number];

export const validateRoleMiddleware =
  (roles: ValidRole[] = []) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {

    const token = req.cookies?.accessToken as string | undefined;

    if (!token) {
      return res.status(403).json({ message: "Token no proporcionado" });
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    } catch {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }

    // 1) Validar que venga un campo 'type' dentro de los roles válidos
    const userType = decoded.userType;
    if (
      typeof userType !== "string" ||
      !VALID_ROLES.includes(userType as ValidRole)
    ) {
      return res.status(403).json({ message: "Rol inválido en token" });
    }

    // 2) Asignar sólo después de validar
    req.user = {
      id: decoded.id as string,
      type: userType as ValidRole,
    };

    // 3) Si se especificaron roles concretos, filtramos
    if (roles.length > 0 && !roles.includes(req.user.type)) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    next();
  };
