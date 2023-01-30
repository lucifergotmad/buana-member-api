export interface IGeneratorUtil {
  generateRandomString(length: number): string;
  generateKodeMember(): Promise<string>;
}
