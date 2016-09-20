import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Challenge } from '../../shared';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {

  challenges: FirebaseListObservable<Challenge>;
  newChallenge: Observable<Challenge>;

  constructor(private af: AngularFire) { }

  ngOnInit() {
    this.challenges = this.af.database.list('challenges');
    this.newChallenge = Observable.of({});
  }

  new(newForm) {
    // console.log('Adding new challenge');
    // remove unwanted key so Firebase doesn't store it
    delete this.newChallenge['_isScalar'];
    // console.log(this.newChallenge);
    this.challenges.push(this.newChallenge);
    // reset form - clears the fields and resets the validation states (like dirty/pristine/touched)
    newForm.reset();
  }

  update(challenge) {
    // remove invalid key so Firebase can update properly
    let key = challenge['$key'];
    delete challenge['$key'];
    delete challenge['$exists'];
    // console.log(challenge);
    this.challenges.update(key, challenge);
    // TODO: add confirm modal; maybe using https://github.com/shlomiassaf/angular2-modal 
  }

  delete(key: string) {
    // console.log(`Deleting ${key}`);
    this.challenges.remove(key);
  }
}
