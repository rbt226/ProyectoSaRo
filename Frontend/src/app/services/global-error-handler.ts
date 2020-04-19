import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingService } from './logging.service';
import { ErrorService } from './error.service';
import { NotificationService } from './notifications.service';
import { SpinnerService } from './spinner.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private injector: Injector,
    private spinnerService: SpinnerService
  ) {}

  handleError(error: any) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);
    this.spinnerService.hideSpinner();

    let message;
    let stackTrace;

    if (error instanceof HttpErrorResponse) {
      message = errorService.getServerMessage(error);

      // Server Erro
      stackTrace = errorService.getServerStack(error);
      notifier.showError(message, '');
    } else {
      // Client Error
      message = errorService.getClientMessage(error);
      stackTrace = errorService.getClientStack(error);
      notifier.showError(message, '');
    }

    // Always log errors
    logger.logError(message, stackTrace);

    console.error('GlobalErrorHandler :', error);
  }
}
