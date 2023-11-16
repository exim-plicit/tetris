//@ts-check
///<reference path="./db.js"/>
"use strict";
import {MDP} from "./mdp.js";
import {Field} from "./field.js";


const program = new Array(3); //とりあえず2順
for(let i = 0 ; i < program.length ; ++i){
	program[i] = new Array(8);
}


const canvas = document.getElementById("canvas");
if(canvas instanceof HTMLCanvasElement){
	const context = canvas.getContext("2d");
	if(context instanceof CanvasRenderingContext2D){
		const field = new Field(context);
		field.updateImage();
	
		canvas.width = field.image.width;
		canvas.height = field.image.height;
		context.fillStyle = "rgb(255,255,255)";
		context.fillRect(0,0,canvas.width,canvas.height);
		context.putImageData(field.image, 0, 0);

		const update = ()=>{
			const minos = [];
			field.reset();
			for(const array of program){
				for(const data of array){
					if(data == undefined) continue;
					const mdp = MDP.unpack(data);
					field.setMino(mdp.type, mdp.dir, mdp.x, mdp.y);
					minos.push(data);
				}
			}
			field.updateImage();
			context.putImageData(field.image, 0, 0);

			const dest_minos = document.getElementById("dest_minos");
			if(dest_minos instanceof HTMLInputElement){
				dest_minos.value = minos.join(",");
			}
		};
		
		canvas.addEventListener("click", (e)=>{
			const sx = e.offsetX;
			const sy = e.offsetY;
			if(sx < 0 || sy < 0 || sx > Field.BLOCK_SIZE*Field.FIELD_W || sy > Field.BLOCK_SIZE*Field.FIELD_H) return;
			const x = Math.floor(sx / Field.BLOCK_SIZE);
			const y = (Field.FIELD_H-1) - Math.trunc(sy / Field.BLOCK_SIZE);
			const forms = document.getElementById("forms");
			if(forms instanceof HTMLFormElement){
				const order = forms["order"];
				const mino = forms["mino"];
				const type = Math.trunc(mino.value / 10);
				const dir = mino.value % 10;
				program[order.value][type] = MDP.pack(type,dir,x,y);
			}
			update();
		});
		const dest_minos = document.getElementById("dest_minos");
		if(dest_minos instanceof HTMLInputElement){
			dest_minos.addEventListener("change",(e)=>{
				const minos = dest_minos.value.split(",");
				minos.forEach((data,index)=>{
					const mdp = MDP.unpack(data);
					program[Math.trunc(index/7)][mdp.type] = data;
				});
				update();
			});
		}
		const reverse = document.getElementById("reverse");
		if(reverse instanceof HTMLButtonElement){
			reverse.addEventListener("click",(e)=>{
				for(const array of program){
					let [src_, src_o, src_i, src_t, src_l, src_j, src_s, src_z] = array;
					let dst_, dst_o, dst_i, dst_t, dst_l, dst_j, dst_s, dst_z;
					if(src_o != undefined){
						const mdp = MDP.unpack(src_o);
						mdp.x = 8 - mdp.x;
						dst_o = MDP.pack(mdp.type, mdp.dir, mdp.x, mdp.y);
					}
					if(src_i != undefined){
						const mdp = MDP.unpack(src_i);
						switch(mdp.dir){
							case 0: mdp.x = 6 - mdp.x; break;
							case 1: mdp.x = 9 - mdp.x; break;
						}
						dst_i = MDP.pack(mdp.type, mdp.dir, mdp.x, mdp.y);
					}
					if(src_t != undefined){
						const mdp = MDP.unpack(src_t);
						switch(mdp.dir){
							case 0: case 2: mdp.x = 7 - mdp.x; break;
							case 1: mdp.dir = 3; mdp.x = 8 - mdp.x; break;
							case 3: mdp.dir = 1; mdp.x = 8 - mdp.x; break;
						}
						dst_t = MDP.pack(mdp.type, mdp.dir, mdp.x, mdp.y);
					}
					if(src_l != undefined){
						const mdp = MDP.unpack(src_l);
						switch(mdp.dir){
							case 0: case 2: mdp.x = 7 - mdp.x; break;
							case 1: mdp.dir = 3; mdp.x = 8 - mdp.x; break;
							case 3: mdp.dir = 1; mdp.x = 8 - mdp.x; break;
						}
						dst_j = MDP.pack(5, mdp.dir, mdp.x, mdp.y);
					}
					if(src_j != undefined){
						const mdp = MDP.unpack(src_j);
						switch(mdp.dir){
							case 0: case 2: mdp.x = 7 - mdp.x; break;
							case 1: mdp.dir = 3; mdp.x = 8 - mdp.x; break;
							case 3: mdp.dir = 1; mdp.x = 8 - mdp.x; break;
						}
						dst_l = MDP.pack(4, mdp.dir, mdp.x, mdp.y);
					}
					if(src_s != undefined){
						const mdp = MDP.unpack(src_s);
						switch(mdp.dir){
							case 0: mdp.x = 7 - mdp.x; break;
							case 1: mdp.x = 8 - mdp.x; break;
						}
						dst_z = MDP.pack(7, mdp.dir, mdp.x, mdp.y);
					}
					if(src_z != undefined){
						const mdp = MDP.unpack(src_z);
						switch(mdp.dir){
							case 0: mdp.x = 7 - mdp.x; break;
							case 1: mdp.x = 8 - mdp.x; break;
						}
						dst_s = MDP.pack(6, mdp.dir, mdp.x, mdp.y);
					}
					array[0] = dst_;
					array[1] = dst_o;
					array[2] = dst_i;
					array[3] = dst_t;
					array[4] = dst_l;
					array[5] = dst_j;
					array[6] = dst_s;
					array[7] = dst_z;
				}
				update();
			});
		}
	}
}
