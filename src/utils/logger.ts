import { Logger } from 'tslog';

const log: Logger = new Logger({
  name: 'chatbot.studio',
  displayLoggerName: true,
  type: 'pretty',
  displayInstanceName: true,
  displayLogLevel: true,
  minLevel: 'trace',
  exposeStack: false,
  exposeErrorCodeFrame: true,
  displayDateTime: true,
  dateTimePattern: 'day-month-year hour:minute:second.millisecond',
  dateTimeTimezone: process.env.TZ || 'Europe/Kiev',
  displayRequestId: false,
  displayFunctionName: true,
  displayTypes: false,
  displayFilePath: 'hidden',
});

export default log;
