import { Provider } from "@nestjs/common";
import { TransaksiMemberReport } from "./transaksi-member-report.use-case";

export const transaksiMemberReportUseCaseProviders: Provider[] = [
  TransaksiMemberReport,
];
