import { PipeTransform, Pipe } from '@angular/core';
import { ICompany } from '../Model/company';

@Pipe({
    name: 'companyFilter'
})

export class CompanyFilterPipe implements PipeTransform {

    transform(value: ICompany[], filter: string): ICompany[] {
filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: ICompany) =>
app.Name != null && app.Name.toLocaleLowerCase().indexOf(filter) != -1
            || app.Email != null && app.Email.toLocaleLowerCase().indexOf(filter) != -1
            || app.Phone != null && app.Phone.toLocaleLowerCase().indexOf(filter) != -1
            || app.Owner != null && app.Owner.toLocaleLowerCase().indexOf(filter) != -1
            || app.Street != null && app.Street.toLocaleLowerCase().indexOf(filter) != -1
            || app.City != null && app.City.toLocaleLowerCase().indexOf(filter) != -1
            || app.State != null && app.State.toLocaleLowerCase().indexOf(filter) != -1
            || app.Country != null && app.Country.toLocaleLowerCase().indexOf(filter) != -1
            || app.DUNS != null && app.DUNS.toLocaleLowerCase().indexOf(filter) != -1
            || app.Type != null && app.Type.toLocaleLowerCase().indexOf(filter) != -1

   ) : value;

  }
}
