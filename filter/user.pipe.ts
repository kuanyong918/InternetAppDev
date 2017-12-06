import { PipeTransform, Pipe } from '@angular/core';
import { IRegister } from '../Model/register';

@Pipe({
    name: 'userFilter'
})

export class UserFilterPipe implements PipeTransform {

    transform(value: IRegister[], filter: string): IRegister[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IRegister) =>
            app.Name != null && app.Name.toLocaleLowerCase().indexOf(filter) != -1
            || app.Role != null && app.Role.toLocaleLowerCase().indexOf(filter) != -1
            || app.UserId != null && app.UserId.toLocaleLowerCase().indexOf(filter) != -1
            || app.Password != null && app.Password.toLocaleLowerCase().indexOf(filter) != -1
            || app.CompanyName != null && app.CompanyName.toLocaleLowerCase().indexOf(filter) != -1
            || app.SecurityAns != null && app.SecurityAns.toLocaleLowerCase().indexOf(filter) != -1
            || app.Contact != null && app.Contact.toLocaleLowerCase().indexOf(filter) != -1
            || app.Address != null && app.Address.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;

    }
}

