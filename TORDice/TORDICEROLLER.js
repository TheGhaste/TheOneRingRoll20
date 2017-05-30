//Hero Quest Dice Mechanics
//
// copyright pug games 2014
// please feel free to use this script, change it, add to it in any way you feel
// Script created by Roll20 user Konrad J.
//
// !tor log on|multi|single|off  // default:on and multi
								// outputs dice rolled to the chat window if "on", only the result if "off"
								// dice rolled will be on single line if "single" and on multiple lines if "multi"
// !tor graphics on|off|s|m|l  //default:on and m
								// shows dice rolled as graphic, small, medium, or large if "on" or as text if "off"
// !tor #h #m					// if h is first then the hero is attacking, if the m is first then the monster is attacking
//
// !tor w #f #n	#w #tn				  	// whisper not really working very well right now, please ignore this option for now
									// will roll the dice and whisper them only to the GM, gm can't whisper dice rolls to other players
									// due to the way the API currently works we can only send a whisper dice roll via text output, even if you have graphics rolling turned on
//
// !tor test // this will output every side of every die to the chat window
//

var TORCONSTANTS = {
	TORCOMMAND : "!tor",
	GRAPHICSIZE : {
    	SMALL : 20,
		MEDIUM : 30,
		LARGE : 40
	},
	TORFEATDICE : {
		UN : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/FeatDice/1.png",
		DEUX : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/FeatDice/2.png",
		TROIS : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/FeatDice/3.png",
		QUATRE : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/FeatDice/4.png",
		CINQ : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/FeatDice/5.png",
		SIX : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/FeatDice/6.png",
		SEPT : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/FeatDice/7.png",
		HUIT : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/FeatDice/8.png",
		NEUF : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/FeatDice/9.png",
		DIX : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/FeatDice/10.png",
		RUNE : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/FeatDice/rune.png",
		EYE : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/FeatDice/eye.png"
	},
	TORNORMALDICE : {
		UN : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/Dice6/1.png",
		DEUX : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/Dice6/2.png",
		TROIS : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/Dice6/3.png",
		QUATRE : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/Dice6/4.png",
		CINQ : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/Dice6/5.png",
		SIX : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/Dice6/6-tengwar.png"
	},
	TORWEARYDICE : {
		UN : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/Dice6/1-weary.png",
		DEUX : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/Dice6/2-weary.png",
		TROIS : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/Dice6/3-weary.png",
		QUATRE : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/Dice6/4.png",
		CINQ : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/Dice6/5.png",
		SIX : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/Dice6/6-tengwar.png"
	},
	SYMBOLS : {
		E : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/FeatDice/eye.png",
		G : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/FeatDice/rune.png",
		T : "https://raw.githubusercontent.com/TheGhaste/TheOneRingRoll20/master/TORDice/Dice6/6-tengwar.png"
				
	}
};

var TORGlobal = {
    diceLogChat : true,
	diceLogChatWhisper : false,
	diceGraphicsChat : true,
	diceGraphicsChatSize : TORCONSTANTS.GRAPHICSIZE.MEDIUM,
	diceTextResult : "",
	diceTextResultLog : "",
	diceGraphicResult : "",
	diceGraphicResultLog : "",
	diceTestEnabled : false,
	diceLogRolledOnOneLine : true
};

function rollTORFeatDice(diceQty, who){

	var roll = 0;
	var diceResult = {
		success : 0,
		eye : 0,
		gandalf : 0,
		tengwar : 0,
		diceGraphicsLog : "",
		diceTextLog : ""
	};
	var i = 0;
	var s1 = '<img src="';
	var s2 = '" title="';
	var s3 = '" height="';
	var s4 = '" width="';
	var s5 = '"/>';
	
		
	if (TORGlobal.diceTestEnabled === true) {
		diceQty = 12;
	}
	
	for (i=1;i<=diceQty;i++) {

		if (TORGlobal.diceTestEnabled === true) {
			roll = roll + 1;
		}
		else {
			roll = randomInteger(12);
		}

		switch(roll) {
				case 1:
				diceResult.diceTextLog = diceResult.diceTextLog + "(1)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORFEATDICE.UN + s2 + "1" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 1;
				break;
			case 2:
				diceResult.diceTextLog = diceResult.diceTextLog + "(2)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORFEATDICE.DEUX + s2 + "2" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 2;
				break;
			case 3:
				diceResult.diceTextLog = diceResult.diceTextLog + "(3)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORFEATDICE.TROIS + s2 + "3" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 3;
				break;
			case 4:
				diceResult.diceTextLog = diceResult.diceTextLog + "(4)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORFEATDICE.QUATRE + s2 + "4" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 4;
				break;
			case 5:
				diceResult.diceTextLog = diceResult.diceTextLog + "(5)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORFEATDICE.CINQ + s2 + "5" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 5;
				break;
			case 6:
				diceResult.diceTextLog = diceResult.diceTextLog + "(6)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORFEATDICE.SIX + s2 + "6" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 6;
				break;
			case 7:
				diceResult.diceTextLog = diceResult.diceTextLog + "(7)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORFEATDICE.SEPT + s2 + "7" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 7;
				break;
			case 8:
				diceResult.diceTextLog = diceResult.diceTextLog + "(8)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORFEATDICE.HUIT + s2 + "8" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 8;
				break;
			case 9:
				diceResult.diceTextLog = diceResult.diceTextLog + "(9)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORFEATDICE.NEUF + s2 + "9" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 9;
				break;
			case 10:
				diceResult.diceTextLog = diceResult.diceTextLog + "(10)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORFEATDICE.DIX + s2 + "10" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 10;
				break;
			case 11:
				diceResult.diceTextLog = diceResult.diceTextLog + "(GandalfRune)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORFEATDICE.RUNE + s2 + "Gandalf Rune" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.gandalf = diceResult.gandalf + 1;
				break;
			case 12:
				diceResult.diceTextLog = diceResult.diceTextLog + "(EyeofSauron)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORFEATDICE.EYE + s2 + "Eye of Sauron" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.eye = diceResult.eye + 1;
				break;
		}
	}
	return diceResult;
}

function rollTORNormalDice(diceQty, who){

	var roll = 0;
	var diceResult = {
		success : 0,
		eye : 0,
		gandalf : 0,
		tengwar : 0,
		diceGraphicsLog : "",
		diceTextLog : ""
	};
	var i = 0;
	var s1 = '<img src="';
	var s2 = '" title="';
	var s3 = '" height="';
	var s4 = '" width="';
	var s5 = '"/>';
	
		
	if (TORGlobal.diceTestEnabled === true) {
		diceQty = 6;
	}
	
	for (i=1;i<=diceQty;i++) {

		if (TORGlobal.diceTestEnabled === true) {
			roll = roll + 1;
		}
		else {
			roll = randomInteger(6);
		}

		switch(roll) {
				case 1:
				diceResult.diceTextLog = diceResult.diceTextLog + "(1)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORNORMALDICE.UN + s2 + "1" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 1;
				break;
			case 2:
				diceResult.diceTextLog = diceResult.diceTextLog + "(2)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORNORMALDICE.DEUX + s2 + "2" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 2;
				break;
			case 3:
				diceResult.diceTextLog = diceResult.diceTextLog + "(3)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORNORMALDICE.TROIS + s2 + "3" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 3;
			break;
			case 4:
				diceResult.diceTextLog = diceResult.diceTextLog + "(4)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORNORMALDICE.QUATRE + s2 + "4" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 4;
				break;
			case 5:
				diceResult.diceTextLog = diceResult.diceTextLog + "(5)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORNORMALDICE.CINQ + s2 + "5" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 5;
				break;
			case 6:
				diceResult.diceTextLog = diceResult.diceTextLog + "(6)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORNORMALDICE.SIX + s2 + "6" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 6;
				diceResult.tengwar = diceResult.tengwar + 1;
				break;
		}
	}
	return diceResult;
}

function rollTORWearyDice(diceQty, who){

	var roll = 0;
	var diceResult = {
		success : 0,
		eye : 0,
		gandalf : 0,
		tengwar : 0,
		diceGraphicsLog : "",
		diceTextLog : ""
	};
	var i = 0;
	var s1 = '<img src="';
	var s2 = '" title="';
	var s3 = '" height="';
	var s4 = '" width="';
	var s5 = '"/>';
	
		
	if (TORGlobal.diceTestEnabled === true) {
		diceQty = 6;
	}
	
	for (i=1;i<=diceQty;i++) {

		if (TORGlobal.diceTestEnabled === true) {
			roll = roll + 1;
		}
		else {
			roll = randomInteger(6);
		}

		switch(roll) {
        	case 1:
				diceResult.diceTextLog = diceResult.diceTextLog + "(1)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORWEARYDICE.UN + s2 + "1" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 0;
				break;
			case 2:
				diceResult.diceTextLog = diceResult.diceTextLog + "(2)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORWEARYDICE.DEUX + s2 + "2" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 0;
				break;
			case 3:
				diceResult.diceTextLog = diceResult.diceTextLog + "(3)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORWEARYDICE.TROIS + s2 + "3" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 0;
				break;
			case 4:
				diceResult.diceTextLog = diceResult.diceTextLog + "(4)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORWEARYDICE.QUATRE + s2 + "4" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 4;
				break;
			case 5:
				diceResult.diceTextLog = diceResult.diceTextLog + "(5)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORWEARYDICE.CINQ + s2 + "5" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 5;
				break;
			case 6:
				diceResult.diceTextLog = diceResult.diceTextLog + "(6)";
				diceResult.diceGraphicsLog = diceResult.diceGraphicsLog + s1 + TORCONSTANTS.TORWEARYDICE.SIX + s2 + "6" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
				diceResult.success = diceResult.success + 6;
				diceResult.tengwar = diceResult.tengwar + 1;
				break;
		}
	}
	return diceResult;
}

function diceAddition(diceTotals, diceResult){
	diceTotals.success 	= diceTotals.success + diceResult.success;
	diceTotals.gandalf 	= diceTotals.gandalf + diceResult.gandalf;
	diceTotals.eye 		= diceTotals.eye + diceResult.eye;
	diceTotals.tengwar 	= diceTotals.tengwar + diceResult.tengwar;
	return diceTotals;
}

function diceTotalsSummed(diceTotals) {
	var diceTS = {
		success : 0,
		gandalf : 0,
		eye : 0,
		tengwar : 0,
		diceGraphicsLog : "",
		diceTextLog : ""
	};
	
	diceTS.success 	= diceTotals.success;
	diceTS.gandalf 	= diceTotals.gandalf;
	diceTS.eye 		= diceTotals.eye;
	diceTS.tengwar	= diceTotals.tengwar;
	return diceTS;
}

function processTheOneRingDiceScript(diceToRoll, who){

	var diceQty = "";
	var diceType = "";
	var diceTotals = {
		success : 0,
		gandalf : 0,
		eye : 0,
		tengwar : 0
	};
	var DiceResults = {
		success : 0,
		gandalf : 0,
		eye : 0,
		tengwar : 0,
		diceGraphicsLog : "",
		diceTextLog : ""
	};
	var diceRolledGraphicsLog = {
		Feat: "",
		Normal : "",
		Weary : ""
	};
	var diceRolledTextLog = {
		Feat: "",
		Normal : "",
		Weary : ""
	};
	
	var tn = 0;
	var i = 0;
	var j = diceToRoll.length;
	var diceTextResults = "";
	var diceGraphicsResults = "";
	var diceTextRolled = "";
	var diceGraphicsRolled = "";
	var s1 = '<img src="';
	var s2 = '" title="';
	var s3 = '" height="';
	var s4 = '" width="';
	var s5 = '"/>';
	
	// won't work with >9 dice of one colour yet!
	for (i=0, j;i<j;i++){
		diceQty = diceToRoll[i].substring(0,2);
		diceType = diceToRoll[i].substring(2);

		switch(diceType) {
		//Blue "Feat" die (d12)
			case 'f':
				diceResults = rollTORFeatDice(diceQty,who);
				diceRolledGraphicsLog.Feat = diceResults.diceGraphicsLog;
				diceRolledTextLog.Feat = diceResults.diceTextLog;
				diceTotals = diceAddition(diceTotals, diceResults);
				break;
		//Green "Normal" die (d6)
			case 'n':
				diceResults = rollTORNormalDice(diceQty,who);
				diceRolledGraphicsLog.Normal = diceResults.diceGraphicsLog;
				diceRolledTextLog.Normal = diceResults.diceTextLog;
				diceTotals = diceAddition(diceTotals, diceResults);
				break;
		//Yellow "Weary" die (d6)
			case 'w':
				diceResults = rollTORWearyDice(diceQty,who);
				diceRolledGraphicsLog.Weary = diceResults.diceGraphicsLog;
				diceRolledTextLog.Weary = diceResults.diceTextLog;
				diceTotals = diceAddition(diceTotals, diceResults);
				break;
			case 'tn':
				tn = diceQty
				break;
		}
	}

	diceTotals = diceTotalsSummed(diceTotals);
	diceTextResults = diceTextResults + "[";
    if (diceTotals.tengwar > 0) {
		diceTextResults = diceTextResults + " tengwar:" + diceTotals.tengwar;
		
		for (i=1;i<=diceTotals.tengwar;i++){
			diceGraphicsResults = diceGraphicsResults + s1 + TORCONSTANTS.SYMBOLS.T + s2 + "tengwar" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
		}
	}
	if (diceTotals.gandalf > 0) {
		diceTextResults = diceTextResults + " Gandalf Rune:" + diceTotals.gandalf;
		for (i=1;i<=diceTotals.gandalf;i++){
			diceGraphicsResults = diceGraphicsResults + s1 + TORCONSTANTS.SYMBOLS.G + s2 + "Gandalf" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
		}
	}
	if (diceTotals.eye > 0) {
		diceTextResults = diceTextResults + " Eye:" + diceTotals.eye;
		for (i=1;i<=diceTotals.eye;i++){
			diceGraphicsResults = diceGraphicsResults + s1 + TORCONSTANTS.SYMBOLS.E + s2 + "Eye" + s3 + TORGlobal.diceGraphicsChatSize + s4 + TORGlobal.diceGraphicsChatSize + s5;
		}
	}

	diceTextResults = diceTextResults + "]";


	if (TORGlobal.diceTestEnabled === true) {
		sendChat("", "/desc " + who + ": 12f 6n 6w");
	}
	else {
		if (TORGlobal.diceLogChatWhisper === true) {
			//sendChat(who, "/w gm " + diceToRoll);
			//sendChat(who, "/w " + who + " " + diceToRoll);
		}
		else {
			sendChat(who, "/em " + diceToRoll);
		}
	}
	
	if (TORGlobal.diceLogChat === true) {
		if (TORGlobal.diceLogRolledOnOneLine === true) {
			diceGraphicsRolled = diceRolledGraphicsLog.Feat + diceRolledGraphicsLog.Normal + diceRolledGraphicsLog.Weary;
			if (diceRolledTextLog.Feat !="") diceTextRolled = diceTextRolled + "Feat:"+diceRolledTextLog.Feat;
			if (diceRolledTextLog.Normal !="") diceTextRolled = diceTextRolled + "Normal:"+diceRolledTextLog.Normal;
			if (diceRolledTextLog.Weary !="") diceTextRolled = diceTextRolled + "Weary:"+diceRolledTextLog.Weary;		
						
			if (TORGlobal.diceGraphicsChat === true && TORGlobal.diceLogChatWhisper === false) {
				sendChat("", "/direct " + diceGraphicsRolled);
			}
			else {
				if (TORGlobal.diceLogChatWhisper === true) {
					//sendChat("", "/w gm " + diceTextRolled);
					//sendChat("", "/w " + who + " " + diceTextRolled);
				}
				else {
					sendChat("", diceTextRolled);
				}
			}			
		}
		else {
			if (TORGlobal.diceGraphicsChat === true && TORGlobal.diceLogChatWhisper === false) {
				if (diceRolledGraphicsLog.Feat !="") sendChat("", "/direct " + diceRolledGraphicsLog.Feat);
				if (diceRolledGraphicsLog.Normal !="") sendChat("", "/direct " + diceRolledGraphicsLog.Normal);
				if (diceRolledGraphicsLog.Weary !="") sendChat("", "/direct " + diceRolledGraphicsLog.Weary);
			}
			else {
				if (TORGlobal.diceLogChatWhisper === true) {
					//sendChat("", "/w gm " + attackDiceResults.diceTextLog);
					//sendChat("", "/w " + who + " " + defendDiceResults.diceTextLog);
				}
				else {
					if (diceRolledTextLog.Feat !="") sendChat("", "Feat:"+diceRolledTextLog.Feat);
					if (diceRolledTextLog.Normal !="") sendChat("", "Normal:"+diceRolledTextLog.Normal);
					if (diceRolledTextLog.Weary !="") sendChat("", "Weary:"+diceRolledTextLog.Weary);
				}
			}
		}
	}

	if (TORGlobal.diceGraphicsChat === true && TORGlobal.diceLogChatWhisper === false) {
		//sendChat("", "/direct Roll:" + diceTotals.success );
		if ( diceTotals.gandalf > 0 || diceTotals.eye > 0 || diceTotals.tengwar > 0 ){		
			sendChat("", "/direct <b>Special: </b>" + diceGraphicsResults );
		}
		if ( diceTotals.gandalf > 0 ){
			if (diceTotals.tengwar > 1 ) {
					sendChat("", "/direct <b>" + who + "</b> roll a <b>automatic extraordinary success.</b>");
					
			}
			else {
				if ( diceTotals.tengwar > 0 ) {
					sendChat("", "/direct <b>" + who + "</b> roll a <b>automatic great success.</b>");
				}
				else {
					sendChat("", "/direct <b>" + who + "</b> roll a <b>automatic success.</b>");
				}
			}
		}		
		else { 
			if (tn === 0 ) {
				if ( diceTotals.success >= tn){
					if (diceTotals.tengwar > 1 ) {
						sendChat("", "/direct <b>" + who + "</b> roll a <b>extraordinary success</b> at <b>TN " + diceTotals.success + ".</b>");	
					}
					else {
						if ( diceTotals.tengwar > 0 ) {
							sendChat("", "/direct <b>" + who + "</b> roll a <b>great success</b> at <b>TN " + diceTotals.success + ".</b>" );							
						}
						else {
							sendChat("", "/direct <b>" + who + "</b> roll a <b>success</b> at <b>TN " + diceTotals.success + ".</b>");
						}
					}		
				}	
			}
			else{
				if ( diceTotals.success >= tn){
					if (diceTotals.tengwar >  1 ) {
							sendChat("", "/direct <b>" + who + "</b> roll a <b>extraordinary success.</b>");							
					}
					else {
						if ( diceTotals.tengwar > 0 ) {
							sendChat("", "/direct <b>" + who + "</b> roll a <b>great success.</b>");
						}
						else {
							sendChat("", "/direct <b>" + who + "</b> roll a <b>success.</b>");
						}
					}		
				}
			
				else {
					sendChat("", "/direct <b>" + who + "</b> fail the roll.");
				}
			}	
		}
	}
	else {
		if (TORGlobal.diceLogChatWhisper === true) {
			//sendChat("Roll", "/w gm " + diceTextResults);
			//sendChat("Roll", "/w " + who + " " + diceTextResults);
		}
		else {
			sendChat("Roll", diceTextResults);
		}
	}
}

var processScriptTabs = function(argv, who) {
    // this will run the various other scripts depending upon the chat
    // window command.  Just add another Case statement to add a new command.
	var tmpLogChat = false;
	var tmpGraphicsChat = false;
	
    var script = argv.shift();
    switch(script) {
    	case TORCONSTANTS.TORCOMMAND:
			switch(argv[0]) {
				case "log":
					switch(argv[1]) {
						case "on":
							TORGlobal.diceLogChat = true;
							break;
						case "off":
							TORGlobal.diceLogChat = false;
							break;
						case "multi":
							TORGlobal.diceLogRolledOnOneLine = false;
							break;
						case "single":
							TORGlobal.diceLogRolledOnOneLine = true;
							break;

					}
					break;
				case "w":
					TORGlobal.diceLogChatWhisper = true;
					argv.shift();
					processTheOneRingDiceScript(argv, who);
					TORGlobal.diceLogChatWhisper = false;
					break;
				case "graphics":
					switch(argv[1]) {
						case "on":
							TORGlobal.diceGraphicsChat = true;
							break;
						case "off":
							TORGlobal.diceGraphicsChat = false;
							break;
						case "s":
							TORGlobal.diceGraphicsChatSize = TORCONSTANTS.GRAPHICSIZE.SMALL;
							break;
						case "m":
							TORGlobal.diceGraphicsChatSize = TORCONSTANTS.GRAPHICSIZE.MEDIUM;
							break;
						case "l":
							TORGlobal.diceGraphicsChatSize = TORCONSTANTS.GRAPHICSIZE.LARGE;
							break;
					}
					break;
				case "test":
					TORGlobal.diceTestEnabled = true;
					tmpLogChat = TORGlobal.diceLogChat;
					tmpGraphicsChat = TORGlobal.diceGraphicsChat;
					TORGlobal.diceLogChat = true;
					TORGlobal.diceGraphicsChat = true;
					processTheOneRingDiceScript(["1f", "1n", "1w"], who);
					TORGlobal.diceTestEnabled = false;
					TORGlobal.diceLogChat = tmpLogChat;
					TORGlobal.diceGraphicsChat = tmpGraphicsChat;
					break;
				default:
					processTheOneRingDiceScript(argv, who);
					TORGlobal.diceLogChatWhisper = false;
			}
			break;
		
    }
};

on("chat:message", function(msg) {
    // returns the chat window command entered, all in lowercase.
    
    var chatCommand = msg.content;
    chatCommand = chatCommand.toLowerCase(); //make all characters lowercase

    var argv = chatCommand.split(' ');
    if (msg.type != 'api') {
        return;
    }
    return processScriptTabs(argv, msg.who);
});
