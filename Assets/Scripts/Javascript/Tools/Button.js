function Button(text, font, fontSize, color, backgroundColor ,margin)
{
	this.text = text;
	this.font = font;
	this.fontSize = fontSize || 15;
	this.color = color || "#FFF";
	this.backgroundColor = backgroundColor || "#000";

	this.Margin = margin || new Vector(20,20)

	this.size = 20;

	this.Box;
	this.txtWidth;
	this.txtHeight;

	this.Render = function(x, y)
	{
		ctx.font = this.fontSize + 'px ' + this.font;

		this.txtWidth = ctx.measureText(this.text).width;
		this.txtHeight = this.fontSize;

		this.Box = new Box(x-this.Margin.x/2, (y-this.txtHeight)-this.Margin.y/2, this.txtWidth+this.Margin.x, this.txtHeight+this.Margin.y);

		ctx.strokeStyle = this.color;
		ctx.strokeRect(this.Box.x, this.Box.y, this.Box.w, this.Box.h);

		ctx.fillStyle = this.backgroundColor;
		ctx.fillRect(this.Box.x, this.Box.y, this.Box.w, this.Box.h);


		ctx.font = this.fontSize + 'px ' + this.font;
		ctx.fillStyle = this.color;
		ctx.fillText(this.text, x, y);

	}
}