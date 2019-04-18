package com.example.assignment1;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //Buttons
        Button ski_button = (Button) findViewById(R.id.ski_button);
        Button climb_button = (Button) findViewById(R.id.climb_button);
        Button backpack_button = (Button) findViewById(R.id.backpack_button);
        Button exit_button = (Button) findViewById(R.id.exit_button);


        //Button listeners to change activities
        ski_button.setOnClickListener(new View.OnClickListener() {

            public void onClick(View view) {
                Intent intent = new Intent(view.getContext(), skiingActivity.class);
                startActivity(intent);
            }
        });

        climb_button.setOnClickListener(new View.OnClickListener() {

            public void onClick(View view) {
                Intent intent = new Intent(view.getContext(), climbingActivity.class);
                startActivity(intent);
            }
        });

        backpack_button.setOnClickListener(new View.OnClickListener() {

            public void onClick(View view) {
                Intent intent = new Intent(view.getContext(), backpackingActivity.class);
                startActivity(intent);
            }
        });

        /*Button listener to exit app
        exit_button.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                @Override
                finish();
                System.exit(0);
            }
        });
        */
    }
}
