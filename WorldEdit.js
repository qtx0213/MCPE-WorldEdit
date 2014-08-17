var selection1 = [0, 0, 0];
var selection2 = [0, 0, 0];
 
var first = false;
var second = false;
 
var set = false;
var replace = false;
 
var saveItemId = 0;
var saveItemData = 0;
 
function useItem(x, y, z, item, block)
{
	if(item == 292)
	{
		saveItemId = block;
     saveItemData = Level.getData (x, y, z);
		print(" Item ID : "+saveItemId+" : "+saveItemData+" "); 
//use the variable, not "block"
		preventDefault();
	}
	
	if(item == 267)
	{
		if(!first)
		{
			first = true;
			selection1[0] = Math.round(x);
			selection1[1] = Math.round(y);
			selection1[2] = Math.round(z);
			print("First position set");
		}
		else if(!second)
		{
			second = true;
			selection2[0] = Math.round(x);
			selection2[1] = Math.round(y);
			selection2[2] = Math.round(z);
			print("Second position set");
		}
		else
		{
			first = false;
			second = false;
			print("Initialized");
		}
	}
	
	if(first && second)
	{
		if(item == 16) // set
		{
			if(set)
			{
				W_set(saveItemId, saveItemData);
				
				set = false;
			}
			else
			{
				clientMessage("Set : Are you sure you want to change to "+saveItemId+" : "+saveItemData+"?");
				set = true;
			}
			preventDefault();
		}
		
		if(item == 15) // replace
		{
			if(replace)
			{
				W_replace(saveItemId, saveItemData);
				
				replace = false;
			}
			else
			{
				clientMessage("Replace : Would you like to replace "+saveItemId+":"+saveItemData+" with "+block+"?");
				replace = true;
			}
			preventDefault();
		}
	}
}
 
function W_set(saveItemId, saveItemData)
{
	var startX = _mathMin(selection1[0], selection2[0]);
	var endX = _mathMax(selection1[0], selection2[0]);
	var startY = _mathMin(selection1[1], selection2[1]);
	var endY = _mathMax(selection1[1], selection2[1]);
	var startZ = _mathMin(selection1[2], selection2[2]);
	var endZ = _mathMax(selection1[2], selection2[2]);
	
	for(var x = startX; x <= endX; x++)
	{
		for(var y = startY; y <= endY; y++)
		{
			for(var z = startZ; z <= endZ; z++)
			{
				setTile(x, y, z, saveItemId, saveItemData);
			}
		}
	}
}
 
function W_replace(block1, block2)
{
	var startX = _mathMin(selection1[0], selection2[0]);
	var endX = _mathMax(selection1[0], selection2[0]);
	var startY = _mathMin(selection1[1], selection2[1]);
	var endY = _mathMax(selection1[1], selection2[1]);
	var startZ = _mathMin(selection1[2], selection2[2]);
	var endZ = _mathMax(selection1[2], selection2[2]);
	
	for(var x = startX; x <= endX; x++)
	{
		for(var y = startY; y <= endY; y++)
		{
			for(var z = startZ; z <= endZ; z++)
			{
				var targetId = getTile(x, y, z);
				if(targetId == block1)
				{
					setTile(x, y, z, block2);
				}
			}
		}
	}
}
 
function _mathMin(first, second) {
	return first < second? first : second;
}
 
function _mathMax(first, second) {
	return first > second? first : second;
}