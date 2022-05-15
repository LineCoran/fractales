        let cvs = document.getElementById('canvas');    
        let ctx = cvs.getContext('2d'); 
    
       
        let drawDisplay = document.getElementById('drawDisplay');
        cvs.setAttribute('width', getComputedStyle(drawDisplay).width);
        cvs.setAttribute('height', getComputedStyle(drawDisplay).height);
        

        let score = document.getElementById('score');   
        let pointText = document.getElementById('point');
        let buttonStartPoints = document.getElementById('startPoints');
        let buttonStart = document.getElementById('start');
        pointText.style.display = "none";
        let IntevalId;

let fractales = {
    
    amountOfUserPoint: 0,               //amount of points that the user can put on the window          
    startPoints: [],                    // saving the coorditates of each starting random point
    amountOfCorners: 4,                 
    userPoint: [],                      // saving the coorditates of each starting user point
    iteration: 0,
    pointColor: "black",
    nameOfStartPoints: ["A", "B", "C", "D", "E", "F", "G"],
    amountOfAttempt: 0,
    rangeOfIteration: 0,
    rangeOfDivided: 0,
    rangeOfPixelSize: 0,
    
    quaterSize: 400,
    pentagonSize: 250,
    
    amountOfClickStart: 0,
    
    getAmountOfCorner: function(){
        let choosedFigure = document.getElementsByClassName("figure__icon--active");
        
        this.amountOfCorners = +(choosedFigure[0].getAttribute('data-amountOfCorner'));
    },
    
    clearInterval: function() {
                while (this.amountOfClickStart == 0) {
                            window.clearInterval(IntevalId);
                            start.removeEventListener('click', function(){
                            setInterval(this.drawNextPoint, this.rangeOfIteration, this)});
                            this.amountOfClickStart++;
                    }
    },
    
    startSetting: function() {
            this.rangeOfIteration = (+document.getElementById('rangevalue').value);
            this.rangeOfDivided = +(document.getElementById('rangevalue1').value);
            this.rangeOfPixelSize = +(document.getElementById('rangevalue2').value);
    },
    
    createShapes: function(amount){
        
                        while (this.startPoints.length!=0) {
                   this.startPoints.pop(); 
                }
        
        switch(amount) {
                
                
                //triangle
            case 3: 
                for (let i = 0; i < this.amountOfCorners; i++){           
                    this.startPoints.push({
                    randomX: Math.floor(Math.random()*cvs.width),
                    randomY: Math.floor(Math.random()*cvs.height)
                })
            };
                break;
            
                //quater
            case 4: 
                    this.startPoints.push({
                            randomX: Math.random()*(cvs.width - this.quaterSize - this.quaterSize/4) + this.quaterSize/6,
                            randomY: Math.random()*(cvs.height - this.quaterSize - this.quaterSize/4) + this.quaterSize/6,
                            });
                
                    this.startPoints.push({
                                randomX: this.startPoints[0].randomX+this.quaterSize,
                                randomY: this.startPoints[0].randomY
                            });
                
                    this.startPoints.push({
                                randomX: this.startPoints[0].randomX,
                                randomY: this.startPoints[0].randomY+this.quaterSize
                            });
                
                    this.startPoints.push({
                                randomX: this.startPoints[0].randomX+this.quaterSize,
                                randomY: this.startPoints[0].randomY+this.quaterSize
                            });
                break;
                
                case 5: 
                
                let xCenter = this.pentagonSize+Math.random()*(cvs.width-2*this.pentagonSize);
                let yCenter = this.pentagonSize+Math.random()*(cvs.height - 2*this.pentagonSize);
                
                for (let i = 0; i < this.amountOfCorners; i++){
                    this.startPoints.push({
                        randomX: (xCenter+this.pentagonSize*(Math.cos(i * 2 * (Math.PI/this.amountOfCorners)))),
                        randomY: (yCenter+this.pentagonSize*(Math.sin(i * 2 * (Math.PI/this.amountOfCorners))))
                    })
                }
                break;
                
                
        }
            
        },
    
    drawStartPoints: function(){
        pointText.style.display = "none";
        this.amountOfUserPoint = 0;
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        for (let i = 0; i < this.amountOfCorners; i++){
            
                this.drawPoint(this.startPoints[i].randomX, this.startPoints[i].randomY);
                this.drawStartTextOfPoints(this.nameOfStartPoints[i], this.startPoints[i].randomX, this.startPoints[i].randomY);
                this.iteration = this.amountOfCorners;
                score.innerHTML = this.iteration;
        }
        this.amountOfUserPoint++;
    },
    
    drawUserPoint: function(){
        
        let that = this;
       
        cvs.addEventListener('click', function(){
            that.startSetting();
            if(that.amountOfUserPoint>0){
                
                that.drawPoint(event.clientX-365, event.clientY-145);
                
                that.userPoint[0] = event.clientX-365;
                that.userPoint[1] = event.clientY-145;
                
                that.changePositionOfTextPoint(that.userPoint[0]+340, that.userPoint[1]+120);
                that.amountOfUserPoint--;
                that.iteration = that.amountOfCorners+1;;
                score.innerHTML = that.iteration; 
                
                if(that.amountOfUserPoint==0) {
        
                    buttonStart.addEventListener('click', function(){
                                    if (that.amountOfClickStart == 1){
                                            that.amountOfClickStart--;
                                            that.startSetting();
                                         IntevalId = setInterval(that.drawNextPoint, (1001-that.rangeOfIteration)/that.rangeOfIteration, that);
                                    }
                                   
                                })
            }
            
            
            }
                                
                }                       
            )
    }, 
    
    drawNextPoint: function(that){
            let newRangeOfIteation = (+document.getElementById('rangevalue').value);
            if(newRangeOfIteation!=that.rangeOfIteration&&that.iteration>4){
                that.createNewInterval(newRangeOfIteation);
            }
            let randomCorner = Math.floor((Math.random()*that.amountOfCorners));
            let x;
            let y;
        (that.userPoint[0]>that.startPoints[randomCorner].randomX)?
            x = that.startPoints[randomCorner].randomX+((that.userPoint[0]-that.startPoints[randomCorner].randomX)/that.rangeOfDivided):
            x = that.startPoints[randomCorner].randomX-((that.startPoints[randomCorner].randomX-that.userPoint[0])/that.rangeOfDivided);

        (that.userPoint[1]>that.startPoints[randomCorner].randomY)?
            y = that.startPoints[randomCorner].randomY+((that.userPoint[1]-that.startPoints[randomCorner].randomY)/that.rangeOfDivided):
            y = that.startPoints[randomCorner].randomY-((that.startPoints[randomCorner].randomY-that.userPoint[1])/that.rangeOfDivided);
            
            that.userPoint[0] = x;
            that.userPoint[1] = y;
            
            that.drawPoint(that.userPoint[0], that.userPoint[1]);
            that.changePositionOfTextPoint(that.userPoint[0]+340, that.userPoint[1]+120);
        
            if(that.iteration>0){
                that.iteration++;
                score.innerHTML = that.iteration;
            }
            
            
            },
    
    changePositionOfTextPoint: function(x, y) {
            pointText.style.display = "block";
            pointText.style.font = "15px serif";
            pointText.innerHTML = 'Point';
            pointText.style.left = String(x)+"px";
            pointText.style.top = String(y)+"px";
            pointText.style.color = "rgb(26, 45, 87)";
        },
    
    drawPoint: function(xCoordinate, yCoordinate){
            ctx.beginPath();
            ctx.arc(xCoordinate, yCoordinate, this.rangeOfPixelSize, 0, 2*Math.PI, false);
            ctx.fillStyle = this.pointColor;
            ctx.fill();
            ctx.closePath();
    },
    
    drawStartTextOfPoints: function(name, x, y) {
        ctx.font = "20px serif";
        ctx.fillStyle = "black";
        ctx.fillText(name, x+7, y);
    },
    
    createNewInterval: function(x){   
        let that = this;
        that.rangeOfIteration = x;
        window.clearInterval(IntevalId);
        IntevalId = setInterval(that.drawNextPoint, (1001-x)/(x), that);
    },
    
    start: function(){
        
        let that = this;
        
        buttonStartPoints.addEventListener('click', function(){
            that.getAmountOfCorner();
            that.clearInterval();
            that.startSetting();
            that.createShapes(that.amountOfCorners);
            that.drawStartPoints();
            that.drawUserPoint();
            })
        },
}

fractales.start();
