var babyObj=function(){
	this.x;	
	this.y;
	this.angle;
	this.babyTailTimer=0;
	this.babyEyeTimer=0;
	this.babyTailCount=0;
	this.babyEyeCount=0;
	this.babyBodyTimer=0;
	this.babyBodyCount=0;
	this.babyEyeInterval=1000;
}; 
babyObj.prototype.init=function(){
	this.x=canwidth*0.5-50;
	this.y=canheight*0.5+50;
    this.angle=0;
};
babyObj.prototype.draw=function(){	
	var deltaY=mom.y-this.y;
	var deltaX=mom.x-this.x;
	var beta=Math.atan2(deltaY, deltaX);
	
	//lerp angle
	this.angle=lerpAngle(beta,this.angle, 0.9);//-pi,pi
	this.x=lerpDistance(mom.x, this.x, 0.98);
	this.y=lerpDistance(mom.y, this.y, 0.98);
	//babytail count
	this.babyTailTimer+=deltaTime;
	if(this.babyTailTimer>50){
		this.babyTailCount=(this.babyTailCount+1)%8;
		this.babyTailTimer%=50;
	}
	this.babyEyeTimer+=deltaTime;
	if(this.babyEyeTimer>this.babyEyeInterval){
		this.babyEyeCount=(this.babyEyeCount+1)%2;
		this.babyEyeTimer%=this.babyEyeInterval;
	}
	this.babyBodyTimer+=deltaTime;
	if(this.babyBodyTimer>300){
		this.babyBodyCount=this.babyBodyCount+1;
		if(this.babyBodyCount>19){
			this.babyBodyCount=19;
			date.gameOver=true;
		}
		this.babyBodyTimer%=300;
	}
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle+Math.PI);
	ctx1.drawImage(babyTail[this.babyTailCount],-babyTail[this.babyTailCount].width*0.5+23,-babyTail[this.babyTailCount].height*0.5);
	ctx1.drawImage(babyBody[this.babyBodyCount],-babyBody[this.babyBodyCount].width*0.5,-babyBody[this.babyBodyCount].height*0.5);
	ctx1.drawImage(babyEye[this.babyEyeCount],-babyEye[this.babyEyeCount].width*0.5,-babyEye[this.babyEyeCount].height*0.5);
	ctx1.restore();	
};