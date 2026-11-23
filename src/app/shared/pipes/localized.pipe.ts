import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { MultilingualList, MultilingualText } from '../../core/models/models';

@Pipe({
  name: 'localized',
  standalone: true,
  pure: false
})
export class LocalizedPipe implements PipeTransform {
  constructor(private langService: LanguageService) {}

  transform(value: MultilingualText | MultilingualList | string | undefined | null): any {
    if (!value) return '';
    if (typeof value === 'string') {
      return this.langService.t(value);
    }
    if (Array.isArray((value as any).fr)) {
      return this.langService.getLocalizedList(value as MultilingualList);
    }
    return this.langService.getLocalizedText(value as MultilingualText);
  }
}
