package com.tradaapp;

import android.os.Bundle; // from splashscreen
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // splashscreen

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

   @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }

  @Override
  protected String getMainComponentName() {
    return "tradaApp";
  }
}
