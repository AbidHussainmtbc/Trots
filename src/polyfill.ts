// https://github.com/angular/angular-cli/issues/9827#issuecomment-386154063
// Add global to window, assigning the value of window itself.
(window as any).global = window;