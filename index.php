<!DOCTYPE html>
<!-- Coding By CodingNepal - youtube.com/codingnepal -->
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">  
    <title>Memory Card Game | CodingNepal</title>
    <link rel="stylesheet" href="style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>

  <body>
    <div class="wrapper">
      <ul class="conteneur-grid">
        
      </ul>
    </div>
    <div class="details">
      <!-- <p class="time">Time: <span><b>20</b>s</span></p> -->
      <p class="steps">Etapes: <span><b>0</b></span></p>
      <button class="start" style="display: flex; align-items: center">
        <div style="color: #6563ff">
          <svg class="play visible" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M8 5v14l11-7z"></path>
          </svg>
        </div>
        <p>Start</p>
      </button>
      <button class="reset" style="display: flex; align-items: center">
        <div style="color: #6563ff">
          <svg class="replay visible" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"></path></svg>
        </div>
        <p>Reset</p>
      </button>
    </div>

    <script src="script.js"></script>
  </body>
</html>