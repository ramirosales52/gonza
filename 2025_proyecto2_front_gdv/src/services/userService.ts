import { apiEndpoints } from "@/api/endpoints";
import { userDtoToUser, type User, type UserDto } from "@/types/User";
import type { IUserService } from "@/services/interfaces/IUserService";

class UserServiceReal implements IUserService {
  async getAllUsers(
    token: string
  ): Promise<{ success: boolean; message?: string; users?: User[] }> {
    try {
      const response = await fetch(apiEndpoints.users.GET_ALL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }
      const usersDto: UserDto[] = await response.json();
      return {
        success: true,
        users: usersDto.map((user) => userDtoToUser(user)),
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error desconocido al obtener los usuarios",
      };
    }
  }

  async getUserByEmail(
    token: string,
    email: string
  ): Promise<{ success: boolean; message?: string; user?: User }> {
    try {
      const response = await fetch(
        apiEndpoints.users.GET_USER_BY_EMAIL(email),
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }
      const userDto: UserDto = await response.json();
      return {
        success: true,
        user: userDtoToUser(userDto),
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error desconocido al obtener los usuarios",
      };
    }
  }

  async getUserProfile(
    token: string
  ): Promise<{ success: boolean; message?: string; user?: User }> {
    try {
      const response = await fetch(apiEndpoints.users.GET_PROFILE, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener el perfil del usuario");
      }
      const userDto: UserDto = await response.json();
      return {
        success: true,
        user: userDtoToUser(userDto),
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error desconocido al obtener el perfil del usuario",
      };
    }
  }

  async updateUserByEmail(
    token: string,
    userEmail: string,
    user: Partial<User>
  ): Promise<{ success: boolean; message?: string; user?: User }> {
    try {
      const response = await fetch(
        apiEndpoints.users.UPDATE_USER_BY_EMAIL(userEmail),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }
      const responseData = (await response.json()) as UserDto;
      return {
        success: true,
        user: userDtoToUser(responseData),
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error desconocido al actualizar el usuario",
      };
    }
  }
}

export const userServiceReal = new UserServiceReal();
