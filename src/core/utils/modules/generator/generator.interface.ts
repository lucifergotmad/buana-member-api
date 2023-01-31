export interface IGeneratorUtil {
  generateRandomString(length: number): string;
  generateKodeMember(): Promise<string>;
  generateNoTransaksi(type: string, date: string): Promise<string>;
}
