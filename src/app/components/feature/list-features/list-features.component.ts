import { Component, OnInit } from '@angular/core';
import { FeatureService } from 'src/app/services/feature.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-list-features',
  templateUrl: './list-features.component.html',
  styleUrls: ['./list-features.component.scss']
})
export class ListFeaturesComponent implements OnInit {

  features = [];



  constructor(
    private featureService: FeatureService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit() {
    this.spinnerService.showSpinner();

    this.featureService.getFeatures().subscribe(
      (res) => {
        this.spinnerService.hideSpinner();
        this.features = res.data;
      },
    );

  }

}
