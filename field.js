//@ts-check
"use strict";

/*
//ブロックのサイズ
const BLOCK_SIZE = 16;
//フィールドのサイズ
const FIELD_W = 10;
const FIELD_H = 10;
*/

class Color{
	r = 0;
	g = 0;
	b = 0;
	set(r,g,b){
		this.r = r;
		this.g = g;
		this.b = b;
	}
}
const DATA2STRUCT = (value)=>{
	return [
		(value >> 0) & 0x7,
		(value >> 3) & 0x1FFFFFFF,
	];
}
const STRUCT2DATA = (type,no)=>{
	return ((type & 0x7) | (no & 0x1FFFFFFF) << 3);
}
export class Field {
	/**
	 * 
	 * @param {CanvasRenderingContext2D} context 
	 */
	constructor(context){
		this.width = Field.FIELD_W * Field.BLOCK_SIZE;
		this.height = Field.FIELD_H * Field.BLOCK_SIZE;

		this.data = new Uint32Array(Field.FIELD_W * Field.FIELD_H);
		
		//画像データにしておく
		this.image = context.createImageData(this.width,this.height);
		this.updateImage();

		//
		this.setNum = 0;
	}
	//ブロックのサイズ
	static get BLOCK_SIZE(){ return 16; }
	//フィールドのサイズ
	static get FIELD_W(){ return 10; }
	static get FIELD_H(){ return 10; }

	/**
	 * 
	 * @param {Number} type 種類
	 * @param {Number} dir 向き
	 * @param {Number} x 座標
	 * @param {Number} y 座標
	 */
	setMino(type, dir, x, y){
		const data = STRUCT2DATA(type, ++this.setNum);
		const setData = (x,y)=>{
			if(x < 0 || x >= Field.FIELD_W) return;
			if(y < 0 || y >= Field.FIELD_H) return;
			this.data[(y*Field.FIELD_W) + x] = data;
		}
		switch(type){
			//O mino
			case 1:{
				switch(dir){
					case 0:
						setData(x+0,y+0);
						setData(x+1,y+0);
						setData(x+0,y+1);
						setData(x+1,y+1);
						break;
				}
			}break;
			//I mino
			case 2:{
				switch(dir){
					case 0:
						setData(x+0,y+0);
						setData(x+1,y+0);
						setData(x+2,y+0);
						setData(x+3,y+0);
						break;
					case 1:
						setData(x+0,y+0);
						setData(x+0,y+1);
						setData(x+0,y+2);
						setData(x+0,y+3);
						break;
				}
			}break;
			//T mino
			case 3:{
				switch(dir){
					case 0:
						setData(x+0,y+0);
						setData(x+1,y+0);
						setData(x+2,y+0);
						setData(x+1,y+1);
						break;
					case 1:
						setData(x+0,y+0);
						setData(x+0,y+1);
						setData(x+0,y+2);
						setData(x+1,y+1);
						break;
					case 2:
						setData(x+1,y+0);
						setData(x+0,y+1);
						setData(x+1,y+1);
						setData(x+2,y+1);
						break;
					case 3:
						setData(x+0,y+1);
						setData(x+1,y+0);
						setData(x+1,y+1);
						setData(x+1,y+2);
						break;
				}
			}break;
			//L mino
			case 4:{
				switch(dir){
					case 0:
						setData(x+0,y+0);
						setData(x+1,y+0);
						setData(x+2,y+0);
						setData(x+2,y+1);
						break;
					case 1:
						setData(x+0,y+0);
						setData(x+0,y+1);
						setData(x+0,y+2);
						setData(x+1,y+0);
						break;
					case 2:
						setData(x+0,y+0);
						setData(x+0,y+1);
						setData(x+1,y+1);
						setData(x+2,y+1);
						break;
					case 3:
						setData(x+0,y+2);
						setData(x+1,y+0);
						setData(x+1,y+1);
						setData(x+1,y+2);
						break;
				}
			}break;
			//J mino
			case 5:{
				switch(dir){
					case 0:
						setData(x+0,y+0);
						setData(x+1,y+0);
						setData(x+2,y+0);
						setData(x+0,y+1);
						break;
					case 1:
						setData(x+0,y+0);
						setData(x+0,y+1);
						setData(x+0,y+2);
						setData(x+1,y+2);
						break;
					case 2:
						setData(x+2,y+0);
						setData(x+0,y+1);
						setData(x+1,y+1);
						setData(x+2,y+1);
						break;
					case 3:
						setData(x+0,y+0);
						setData(x+1,y+0);
						setData(x+1,y+1);
						setData(x+1,y+2);
						break;
				}
			}break;
			//S mino
			case 6:{
				switch(dir){
					case 0:
						setData(x+0,y+0);
						setData(x+1,y+0);
						setData(x+1,y+1);
						setData(x+2,y+1);
						break;
					case 1:
						setData(x+1,y+0);
						setData(x+0,y+1);
						setData(x+1,y+1);
						setData(x+0,y+2);
						break;
				}
			}break;
			//Z mino
			case 7:{
				switch(dir){
					case 0:
						setData(x+1,y+0);
						setData(x+2,y+0);
						setData(x+0,y+1);
						setData(x+1,y+1);
						break;
					case 1:
						setData(x+0,y+0);
						setData(x+0,y+1);
						setData(x+1,y+1);
						setData(x+1,y+2);
						break;
				}
			}break;
		}
	}
	updateImage(){
		const data = (x,y)=>{
			return this.data[(((Field.FIELD_H-1) - y) * Field.FIELD_W) + x];
		}

		for(let y = 0 ; y < this.height ; ++y){
			for(let x = 0 ; x < this.width ; ++x){
				const isLink = (myno,ix,iy)=>{
					if(ix < 0) return false;
					if(iy < 0) return false;
					if(ix >= Field.FIELD_W) return false;
					if(iy >= Field.FIELD_H) return false;
					const [type,no] = DATA2STRUCT(data(ix, iy));
					return (myno == no);
				};

				const sx = (x % Field.BLOCK_SIZE);
				const sy = (y % Field.BLOCK_SIZE);
				const ix = Math.trunc(x / Field.BLOCK_SIZE);
				const iy = Math.trunc(y / Field.BLOCK_SIZE);
				const [type,no] = DATA2STRUCT(data(ix,iy));

				const color_frame = new Color()
				const color_inner = new Color()
				//色決定
				switch(type){
				case 0: color_frame.set( 16, 16, 16); color_inner.set(  0,  0,  0); break; //(null)
				case 1: color_frame.set(128,128,  0); color_inner.set(255,255,  0); break; //O mino
				case 2: color_frame.set(  0,128,128); color_inner.set(  0,255,255); break; //I mino
				case 3: color_frame.set(128, 64,128); color_inner.set(255,128,255); break; //T mino
				case 4: color_frame.set(128, 64,  0); color_inner.set(255,128,  0); break; //L mino
				case 5: color_frame.set(  0, 80,128); color_inner.set(  0,160,255); break; //J mino
				case 6: color_frame.set( 32,128,  0); color_inner.set( 64,255,  0); break; //S mino
				case 7: color_frame.set(128, 32, 32); color_inner.set(255, 64, 64); break; //Z mino
				}
				
				let color = color_inner;
				const N = (Field.BLOCK_SIZE-1);
				if(no != 0){
					if(sx==0 || sx==N || sy==0 || sy==N){
						color.set((color_inner.r+color_frame.r)/2,(color_inner.g+color_frame.g)/2,(color_inner.b+color_frame.b)/2);
					}
					//seed値を持っていたら接続判定を行う
					if(sx==0 && !isLink(no, ix-1, iy)) color = color_frame;
					if(sx==N && !isLink(no, ix+1, iy)) color = color_frame;
					if(sy==0 && !isLink(no, ix, iy-1)) color = color_frame;
					if(sy==N && !isLink(no, ix, iy+1)) color = color_frame;
				}else{
					//seed値を持っていなかったら強制的に独立させる
					if(sx==0 || sx==N || sy==0 || sy==N) color = color_frame;
				}

				let shift = 0;
				if(0 < no && no <= 6) shift = 0;
				if(7 < no && no <= 14) shift = 2;

				const index = (y*this.width + x) * 4;
				this.image.data[index+0] = color.r >> shift;
				this.image.data[index+1] = color.g >> shift;
				this.image.data[index+2] = color.b >> shift;
				this.image.data[index+3] = 255;
			}
		}
	}
	reset(){
		this.setNum = 0;
		this.data.fill(0);
	}
}