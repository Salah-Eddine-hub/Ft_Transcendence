"use client";
import { useEffect, useRef, useState } from "react";

const PongGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [start,setStart] = useState<boolean>(false)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  //ball interface
  interface Ball{
    x:number;
    y:number;
    radius:number;
    speed: number;
    velocityX: number;
    velocityY: number;
    color: string;
  }

  interface Net{
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
  }

  interface Player {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    score: number;
  }

  const [net, setNet] = useState<Net>()
  const [player, setPlayer] = useState<Player>()
  const [computer, setComputer] = useState<Player>()
  
  //select canvas
  const canv = canvasRef.current;
  const [ball, setBall] = useState<Ball>();

  interface Sides{
    top:number;
    bottom:number;
    left:number;
    right:number;
  }
  
  let bSide: Sides = {top: 0, bottom: 0, left: 0, right: 0};
  let pSide: Sides = {top: 0, bottom: 0, left: 0, right: 0};
    
  useEffect(() => {
      if (canvas)
      {
        setNet({x: canvas.width / 2 - 1, y: 0, width: 2, height: 10, color: "WHITE" })
        setBall({x: canvas.width / 2, y: canvas.height / 2, radius: 10,speed: 0.9, velocityX: 5, velocityY: 5, color: "WHITE"})
        setPlayer({x: 0, y: canvas.height / 2 - 50, width: 20, height: 100, color: "WHITE", score:0 })
        setComputer({x: canvas.width - 20, y: canvas.height / 2 - 50, width: 20, height: 100, color: "WHITE", score:0 })
      }
      
  }, [ctx])

  const drawFirstPlayer = () =>{
    if (ctx && canvas && player)
    {
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x,player.y,player.width,player.height);
    }
  }
  const drawSecondPlayer = () =>{
    if (ctx && canvas && computer)
    {
      ctx.fillStyle = computer.color;
      ctx.fillRect(computer.x,computer.y,computer.width,computer.height);
    }
  }

  const drawRect = () => {
    if (ctx && canvas)
    {
      ctx.fillStyle = "rgb(100 116 139)";
      ctx.fillRect(0,0,canvas.width,canvas.height);
    }
  };
  
  const drawCircle = () => {
    if (ctx && canvas && ball)
    {
      ctx.fillStyle = ball.color;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }
  
  const drawNet = () => {
    if (ctx && canvas && net) {
      for (let i = 0; i <= canvas.height; i += 4) {
        ctx.fillStyle = net.color;
        ctx.fillRect(net.x,net.y + i,net.width,net.height);
      }
    }
  };

  const collision = () => {

    if (ball && computer && canvas && player)
    {
      bSide.top = ball.y - ball.radius
      bSide.bottom=ball.y + ball.radius
      bSide.left = ball.x - ball.radius
      bSide.right = ball.x + ball.radius
      if (ball.x < canvas.width / 2)
      {
        pSide.top = player.y
        pSide.bottom= player.y + player.height
        pSide.left = player.x
        pSide.right = player.x + player.width
      }
      else
      {
        pSide.top = computer.y
        pSide.bottom= computer.y + computer.height
        pSide.left = computer.x
        pSide.right = computer.x + computer.width
      }
    }
    if (bSide && pSide)
    {
      return (bSide.right > pSide.left && bSide.bottom > pSide.top && bSide.left < pSide.right && bSide.top < pSide.bottom);
    }
    return (false)
  };

  const ComputerMovement = () => {

    let targetP:number = 0;
    let currentP: number = 0;
    let lvl_C: number = 0.1;
    if (ball && computer)
    {
      targetP = ball?.y - computer.height / 2
      currentP = computer.y
      computer.y = currentP + (targetP - currentP) * lvl_C
    }
  }

  useEffect(() =>{
    document.body.addEventListener('keydown', (e) =>{
      if (e.key == "ArrowUp")
      {
        if (player)
        {
          player.y -= 8
          console.log(player.x)
          console.log(player.y)
        }
      }
      if(e.key == "ArrowDown")
      {
        if (player)
        {
          player.y += 8
          console.log(player.x)
          console.log(player.y)
        }
      }
    })
    canvas?.addEventListener("mousemove" , (e) =>{
      let rect = canvas.getBoundingClientRect();
      if (player)
      {
        player.y = e.clientY - rect.top - player.height / 2;
        console.log(player.x)
        console.log(player.y)
      }
    })
  })

  const render = () => {
    drawRect();
    drawNet()
    //draw the ball
    drawCircle()
    //draw the player
    drawFirstPlayer()
    drawSecondPlayer()
  } 

  const reSetBall = () => {
    if (ball && canvas)
    {
      ball.x = canvas?.width / 2;
      ball.y = canvas.height / 2;
      // ball.speed = 0.3;
      ball.velocityX = 5;
      ball.velocityY = 5;
    }
    if(player && canvas)
    {
      player.x = 5;
      player.y = canvas.height / 2 - 20;
    }
    if (computer && canvas)
    {
      computer.x = canvas.width - 20;
      computer.y = canvas.height / 2 - 50;
    }
  }

  const update = () => {
    if (ball && canvas)
    {
      // ball movement
      ball.x += ball.velocityX * ball.speed;
      ball.y += ball.velocityY * ball.speed;
      // ball collision with Top & Bottom borders
      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0)
        ball.velocityY = -ball.velocityY;
      // ball collision with players
      if (collision())
      {
        ball.velocityX *= -1;
        //increse speed
        // ball.speed += 0.1;
      }
      ComputerMovement()
      if (ball.x - ball.radius <  0)
      {
        console.log("scooooor");
        console.log(canvas.height)
        if (computer)
        computer.score++;
        reSetBall()
      }
      else if(ball.x + ball.radius > canvas.width)
      {
        console.log("scooooor");
        if (player)
        player.score++;
        reSetBall()
      }
    }
  }
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      if(canv)
      {
        setCanvas(canv)
        setCtx(canv.getContext('2d'))
        if (ctx && canvas)
        {
          update();
          render();
        }
      }
  }, 1000 / 60);

  return () =>{
    clearInterval(intervalId)
  };

  },[start])

  const handleClick =  () => {
    setStart((prevPaused) => { return !prevPaused});
  }

  

  return (
    <>
      <canvas
        ref={canvasRef}
        id="pong"
        height="450"
        width="900"
        className="bg-slate-500 bg-opacity-90 rounded-3xl flex justify-center items-center flex-raw"
      ></canvas>
      <button onClick={handleClick} className="border-2">play</button>
    </>
  )
}

export default PongGame;