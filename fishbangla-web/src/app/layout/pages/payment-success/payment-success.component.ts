import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  public status : string;
   constructor(private router: Router, private route: ActivatedRoute) {
    
   }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = params['status'] as string;
      console.log(id)
      this.status = id
      console.log(status)
      this.redirectToHome(this.status)
    });
  }

  redirectToHome(status: string){
    if (status == "200") {
      localStorage.removeItem("cart_key");
      this.router.navigate(['/home'], { relativeTo: this.route });
    }
    else {
      this.router.navigate(['/cart'], { relativeTo: this.route });
    }
  }

}
