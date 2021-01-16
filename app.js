const score = document.querySelector('.score');
        const gameArea = document.querySelector('.gameArea');
        const start = document.querySelector('.start');

        let player = {score : 0, speed : 4};

        let keys = { ArrowUp : false, ArrowDown : false, ArrowLeft : false, ArrowRight : false};

        document.addEventListener('keyup', keyUp);
        document.addEventListener('keydown', keyDown);

        function keyDown(e){
            e.preventDefault();
            keys[e.key] = true;
        }

        function keyUp(e){
            e.preventDefault();
            keys[e.key] = false;
        }

        start.addEventListener('click', startGame);
         
        function movelines(){

            let lines = document.querySelectorAll('.line');

            lines.forEach(function(item){
                if(item.y >= 680){
                    item.y -= 750;
                }

                item.y += player.speed;
                item.style.top = item.y + 'px';
            })
        }

        function isCollide(a,b){
            aRect = a.getBoundingClientRect();
            bRect = b.getBoundingClientRect();
            return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right));
        }

        
        function endGame(){
            player.start = false;
            start.classList.remove('hide');
            gameArea.innerHTML = "";
            start.innerHTML = `<p>Game Over <br> Your final score is ${player.score} <br> Press here to play again`;
        }


        function moveenemy(car){
            let enemy = document.querySelectorAll(".enemy");

            enemy.forEach(function(item){

                if(isCollide(car,item)){
                    endGame();
                }

                if(item.y >= 700){
                    item.y = -300;
                    item.style.left = Math.floor(Math.random() * 350) + "px";
                }
                item.y += player.speed;
                item.style.top = item.y + "px";
            })

        }



        function playGame(){

            let car = document.querySelector('.car');

            let road = gameArea.getBoundingClientRect();

            if(player.start){
                if(keys.ArrowDown && player.y < (road.bottom - 70)) {player.y += player.speed;}
                if(keys.ArrowUp && player.y > (road.top + 80)) {player.y -= player.speed;}
                if(keys.ArrowLeft && player.x > 0) {player.x -= player.speed};
                if(keys.ArrowRight && player.x < road.width - 60) {player.x += player.speed};
            }

            movelines();
            moveenemy(car);


            car.style.left = player.x + "px";
            car.style.top = player.y + "px";

            window.requestAnimationFrame(playGame);
            player.score++;

            let ps = player.score - 1;
            score.innerText = `Score ${ps}`;

        }


        function startGame(){
            start.classList.add('hide');
            gameArea.classList.remove('hide');
            score.classList.remove('hide');

            player.start = true;
            player.score = 0;

            window.requestAnimationFrame(playGame);

            for(let i=0;i<5;i++){
                let line = document.createElement('div');
                line.setAttribute('class','line');
                line.y = (i*150)+30;
                line.style.top = line.y + "px";
                gameArea.appendChild(line);
            }

            let car = document.createElement('div');
            car.setAttribute('class','car');
            gameArea.appendChild(car);

            player.x = car.offsetLeft;
            player.y = car.offsetTop;
            
            
            for(let i=0;i<4;i++){
                console.log('child creates')
                let enemyCar = document.createElement('div');
                enemyCar.setAttribute('class','enemy');
                enemyCar.y = ((i+1)*250) * -1;
                enemyCar.style.top = enemyCar.y + "px";
                enemyCar.style.background = 'mediumblue';
                enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
                gameArea.appendChild(enemyCar);
            }

        }