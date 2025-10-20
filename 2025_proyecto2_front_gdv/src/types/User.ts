import { Role } from "./Role";

export type User = {
  email: string;
  name: string;
  lastname: string;
  active: boolean;
  role: Role;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
};

// TODO: Ver cual es la mejor manera de hacerlo
// Interfaz que responde la api de los users
export type UserDto = {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  role: "USER" | "AUDITOR";
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  createdAt?: string;
  updatedAt?: string;
};

export function mapUserDtoRoleToRole(role: UserDto["role"]): Role {
  if (role === "AUDITOR") return Role.AUDITOR;
  return Role.USER;
}

export const userDtoToUser = (userDto: UserDto): User => ({
  name: userDto.firstName,
  lastname: userDto.lastName,
  email: userDto.email,
  active: userDto.isActive,
  role: mapUserDtoRoleToRole(userDto.role),
  phone: userDto.phone,
  address: userDto.address,
  city: userDto.city,
  province: userDto.province,
});
