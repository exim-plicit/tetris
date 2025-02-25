//@ts-check
"use strict";

/**
 * Mino Direction Position
 */
export class MDP{
	static pack(type, dir, x, y){
		let value = 0x0;
		value |= (type     & 0x07) << 10;
		value |= (dir      & 0x03) << 8;
		value |= ((y*10+x) & 0xFF) << 0;
		return value;
	}
	static unpack(value){
		const xy = (value & 0xFF);
		return {
			type: (value >> 10) & 0x7,
			dir: (value >>  8) & 0x3,
			x: Math.trunc(xy%10),
			y: Math.trunc(xy/10),
		};
	}
}