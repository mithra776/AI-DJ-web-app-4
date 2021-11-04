song = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_left_wrist = 0;
song1_status = "";

function preload()
{
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(450 , 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded()
{
    console.log("the model is loaded people");
}

function draw()
{
    image(video , 0 , 0 , 450 , 450);
    fill("#FF0000");
    stroke("#FF0000");

    song1_status =  song.isPlaying();
    

    if(score_left_wrist > 0.2)
    {
        circle(leftWristX , leftWristY , 20);
        song2.stop()
    }

    if(song1_status == "false")
    {
        song.play();
        document.getElementById("song").innerHTML = song;
    }

}

function gotPoses(results)
{
   if(results.length > 0)
   {
       console.log();
       score_left_wrist = results[0].pose.keypoints[9].score;
       leftWristX = results[0].pose.leftWrist.x;
       leftWristY = results[0].pose.leftWrist.y;
       console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

       rightWristX = results[0].pose.rightWrist.x;
       rightWristY = results[0].pose.rightWrist.y;
       console.log("rigthWristX = " + rightWristX + " rightWristY = " + rightWristY);
   }
}

