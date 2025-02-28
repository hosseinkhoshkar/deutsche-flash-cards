import { Injectable } from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';

@Injectable()
export class CustomHammerConfig extends HammerGestureConfig {
  override overrides = {
    swipe: {
      direction: 31, // Enable horizontal and vertical swipes
    },
  };
}
