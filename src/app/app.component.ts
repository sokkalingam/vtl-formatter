import { Component } from '@angular/core';
import * as _ from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text = "";
  formattedText = "";

  tabInList = ["#if", "#foreach"];
  tabOutList = ["#end"];
  tabInOutList = ["#else", "#elseif"];
  conditions = ["#if", "#elseif", "#foreach"];

  NEW_LINE = "\n";

  tabLen = 0;

  format(): void {
    let arr = _.split(this.text, "\n");

    arr.forEach(line => {

      line = _.trim(line);
      line = this.formatCondition(line);
      this.formatIndentation(line);
    });

  }

  formatCondition(line: string): string {
    this.conditions.forEach(cond => {
      let condWithSpace = cond + " ";
      if (_.startsWith(line, cond) && !_.startsWith(line, condWithSpace)) {
        line = _.replace(line, cond, condWithSpace);
        return line;
      }
    });
    return line;
  }

  formatIndentation(line: string): void {
    let firstWord = _.get(_.split(line, " "), 0, "");
    if (_.includes(this.tabInOutList, firstWord)) {
      this.tabLen--;
      this.formattedText += this.getTab() + line + this.NEW_LINE;
      this.tabLen++;
    } else if (_.includes(this.tabInList, firstWord)) {
      this.formattedText += this.getTab() + line + this.NEW_LINE;
      this.tabLen++;
    } else if (_.includes(this.tabOutList, firstWord)) {
      this.tabLen--;
      this.formattedText += this.getTab() + line + this.NEW_LINE;
    } else {
      this.formattedText += this.getTab() + line + this.NEW_LINE;
    }
  }

  getTab(): string {
    return _.repeat("\t", this.tabLen);
  }
}
