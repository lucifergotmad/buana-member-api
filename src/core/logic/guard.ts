import { UserLevel } from "../constants/app/user/user-level.const";
import { MemberJenisKelamin } from "../constants/app/member/jenis-kelamin.const";
import { MemberStatusMenikah } from "../constants/app/member/status-menikah.const";
import { MemberAgama } from "../constants/app/member/agama.const";
import { MemberPendidikan } from "../constants/app/member/pendidikan.const";

export class Guard {
  static isEmpty(value: unknown): boolean {
    if (typeof value === "number" || typeof value === "boolean") {
      return false;
    }
    if (typeof value === "undefined" || value === null) {
      return true;
    }
    if (value instanceof Date) {
      return false;
    }
    if (value instanceof Object && !Object.keys(value).length) {
      return true;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return true;
      }
      if (value.every((item) => Guard.isEmpty(item))) {
        return true;
      }
    }
    if (value === "") {
      return true;
    }

    return false;
  }

  static isEmail(value: string) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value,
    );
  }

  static isValidRTRW(value: string) {
    return /\d{2}\/\d{2}/s.test(value) || /\d{3}\/\d{3}/s.test(value);
  }

  static isInvalidPendidikan(value: string) {
    return !Object.values(MemberPendidikan).includes(value as MemberPendidikan);
  }

  static isDuplicate(value: any[]): boolean {
    return !!value.find((value, index) => value.indexOf(value) !== index);
  }

  static isInvalidString(value: string): boolean {
    return /[^0-9A-Za-z_.-]+/.test(value);
  }

  static isNotPhoneNumber(value: string): boolean {
    return !/^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/.test(
      value,
    );
  }

  static isNotLocalPhoneNumber(value: string): boolean {
    return !/^(\+62|62)?[\s-]?0?([2-7]|9)\d(\d)?[\s-]?[2-9](\d){6,7}$/.test(
      value,
    );
  }

  static isNotDateString(value: string): boolean {
    return !/\d{4}-\d{2}-\d{2}/.test(value);
  }

  static isInvalidAccountNumber(value: string): boolean {
    return !/[^0-9.]+/.test(value);
  }

  static isInvalidLevel(value: string): boolean {
    return !Object.values(UserLevel).includes(value as UserLevel);
  }

  static isInvalidAgama(value: string): boolean {
    return !Object.values(MemberAgama).includes(value as MemberAgama);
  }

  static isInvalidJenisKelamin(value: string): boolean {
    return !Object.values(MemberJenisKelamin).includes(
      value as MemberJenisKelamin,
    );
  }

  static isInvalidStatusMenikah(value: string): boolean {
    return !Object.values(MemberStatusMenikah).includes(
      value as MemberStatusMenikah,
    );
  }

  static isInvalidNomorIdentitas(value: string): boolean {
    return !/^(1[1-9]|21|[37][1-6]|5[1-3]|6[1-5]|[89][12])\d{2}\d{2}([04][1-9]|[1256][0-9]|[37][01])(0[1-9]|1[0-2])\d{2}\d{4}$/.test(
      value,
    );
  }

  static isInvalidNomorSIM(value: string): boolean {
    return !/\d{12}/s.test(value);
  }
}
