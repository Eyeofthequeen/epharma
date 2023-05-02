import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent {
  @Input() pages: Object

  constructor(private router: Router, private route: ActivatedRoute) {}

  goToPath(chemin: string) {
    this.router.navigate([chemin], {relativeTo: this.route})
  }

  selectedTab(chemin: string): boolean {
    return this.router.url.includes(chemin)
  }
}
