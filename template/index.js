//@ts-check
///<reference path="./db.js"/>
"use strict";
import {MDP} from "./mdp.js";
import {Field} from "./field.js";


//フィルタ
{
	const onchange = (event)=>{
		const css = document.getElementById("css-filter");
		if(css instanceof HTMLStyleElement){
			let temp = "";
			for(const filter of document.querySelectorAll(".filter")){
				if(filter instanceof HTMLInputElement){
					const key = filter.getAttribute("data-key");
					for(const value of filter.value.split(/[\s,]/)){
						if(value) temp += `[${key}*="${value}"]`;
					}
				}
			}
			if(temp){
				css.textContent = `.card:not(${temp}){display: none !important;}`;
			}else{
				css.textContent = "";
			}
		}
	}
	for(const filter of document.querySelectorAll(".filter")){
		if(filter instanceof HTMLInputElement){
			filter.onchange = onchange;
		}
	}
}

const cards = document.getElementById("cards");
if(cards instanceof HTMLDivElement){
	for(const template of templates){
		//カード
		const card = document.createElement("div");
		card.classList.add("card");
		card.setAttribute("data-id",template.id);
		card.setAttribute("data-name",template.name);
		card.setAttribute("data-tag",template.tags.join(","));
		card.setAttribute("data-minos",template.minos.join(","));
		//テンプレ名
		const name = card.appendChild(document.createElement("div"));
		name.classList.add("name");
		name.append(document.createTextNode(template.name));
		//サムネイル
		const container = card.appendChild(document.createElement("div"));
		container.classList.add("thumbnail");
		{
			const ordinal = (value)=>{
				const n = Math.abs(value);
				const cent = n % 100;
				if (cent >= 10 && cent <= 20) return n+"th";
				switch(n % 10){
					case 1: return n+"st";
					case 2: return n+"nd";
					case 3: return n+"rd";
				}
				return n+"th";
			}
			//考案
			const inventor = container.appendChild(document.createElement("div"));
			inventor.classList.add("inventor");
			inventor.append(document.createTextNode(template.id));
			//原案
			const originator = container.appendChild(document.createElement("div"));
			originator.classList.add("originator");
			originator.append(document.createTextNode(template.id));
			//ID
			const opid = container.appendChild(document.createElement("div"));
			opid.classList.add("opid");
			opid.append(document.createTextNode(template.id));
			//画像部
			const canvas = container.appendChild(document.createElement("canvas"));
			canvas.classList.add("canvas");
			const context = canvas.getContext("2d");
			if(context instanceof CanvasRenderingContext2D){
				const field = new Field(context);
				for(const mino of template.minos){
					const mdp = MDP.unpack(mino);
					field.setMino(mdp.type, mdp.dir, mdp.x, mdp.y);
				}
				field.updateImage();
		
				canvas.width = field.image.width;
				canvas.height = field.image.height;
				context.fillStyle = "rgb(255,255,255)";
				context.fillRect(0,0,canvas.width,canvas.height);
				context.putImageData(field.image, 0, 0);
			}
		}
		//タグ
		for(const tag of template.tags){
			const div = card.appendChild(document.createElement("div"));
			div.classList.add("tag");
			if(tags[tag]) div.style["background"] = tags[tag].color;
			div.append(document.createTextNode(tag));
		}
		cards.appendChild(card);
	}
}