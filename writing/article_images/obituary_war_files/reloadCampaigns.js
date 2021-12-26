//<script>
bouncex.tryCatch(function reloadCampaigns(){
	var newCampaigns = false;
	bouncex.creatives = false;
	bouncex.brandStyles = false;
	bouncex.webfonts = false;

	if (bouncex.gbi) {
		bouncex.gbi.stacks = false;
	}

	var newCookie = {"v":{"submitted_onsite":false,"ever_logged_in":false,"submitted_email_backchannel":false,"submitted_email_gadgetlabs":false,"submitted_email_games":false,"submitted_email_transport":false,"submitted_email_techintwo":false,"submitted_email_science":false,"submitted_email_deals":false,"submitted_email_daily":false,"ccpa_cali":true,"reg_gate_submitted":false,"reg_gate_url":false},"fvt":1640216017,"vid":1640542024105364,"ao":6,"lp":"https%3A%2F%2Fwww.wired.com%2Fstory%2Fmorbid-war-online-obituaries%2F","as":0,"vpv":3,"d":"d","r":"t.co","cvt":1640542024,"sid":7,"gcr":96,"m":0,"did":"4902143374747241915","lvt":1640543012,"campaigns":{"1278967":{"lvt":1640531232,"lavid":1,"la":1640531232,"fsa":1640229794,"as":1,"ao":2,"oa":[1640229794,1640531232],"io":1,"wc":1640229796},"1323592":{"lvt":1640229761,"lavid":1,"as":1,"la":1640229761,"fsa":1640229761,"ao":1,"oa":[1640229761],"io":1,"wc":1640229763},"1501017":{"lvt":1640538813,"lavid":1,"la":1640538558,"fsa":1640538558,"as":1,"ao":1,"oa":[1640538558],"io":1},"1561283":{"lvt":1640531226,"as":1,"lavid":1,"la":1640531226,"fsa":1640216021,"ao":2,"oa":[1640216021,1640531226],"io":1,"wc":1640531227}}};
	var campaignAdded = false;
	for (var campaignId in newCampaigns) {
		if (newCampaigns.hasOwnProperty(campaignId)) {
			// if campaign cookie does not exist
			if (!bouncex.cookie.campaigns) {
				bouncex.cookie.campaigns = {};
			} else {
				bouncex.cookie.campaigns = Object.assign({}, bouncex.cookie.campaigns);
			}

			if (!bouncex.cookie.campaigns[campaignId]) {
				campaignAdded = true;
				bouncex.cookie.campaigns[campaignId] = {lvt:bouncex.cookie.lvt, vv:0};
			} else if (newCookie.campaigns[campaignId]) {
				// need to set campaign cookie's activations_sessions to the new cookie as it gets modified in reloadCampaigns
				campaignAdded = true;
				bouncex.cookie.campaigns[campaignId].as = newCookie.campaigns[campaignId].as;
			}
		}
	}
	if (campaignAdded) {
		bouncex.setBounceCookie();
	}

	for (var campaignId in bouncex.campaigns) {
		if (bouncex.campaigns.hasOwnProperty(campaignId)) { //copy state vars
			if (newCampaigns[campaignId]) {
				newCampaigns[campaignId].ap = bouncex.campaigns[campaignId].ap;
				newCampaigns[campaignId].repressed = Boolean(bouncex.campaigns[campaignId].repressed);
			}

			if (newCampaigns[campaignId] &&
				bouncex.campaigns[campaignId].ad_visible &&
				newCampaigns[campaignId].html.replace(/fsa=(\d+)&|width=(\d+)&|height=(\d+)&/gi,'') == bouncex.campaigns[campaignId].html.replace(/fsa=(\d+)&|width=(\d+)&|height=(\d+)&/gi,'')) {
								newCampaigns[campaignId] = bouncex.campaigns[campaignId];
			} else if (newCampaigns[campaignId] && bouncex.isGbi2Campaign(campaignId) && bouncex.campaigns[campaignId].gbi.hasBegunAuction) {
								newCampaigns[campaignId] = bouncex.campaigns[campaignId];
			} else {
				bouncex.destroy_ad(campaignId);
			}
		}
	}

	bouncex.campaigns = newCampaigns;
	newCampaigns = {};

	bouncex.debug = false;
		bouncex.setBounceCookie();
	if (bouncex.campaigns) {
		for (var campaignId in bouncex.campaigns) {
			if (bouncex.campaigns[campaignId].ad_visible && typeof bouncex.repressCampaigns === 'function') {
				bouncex.repressCampaigns(campaignId);
			}
		}
		bouncex.loadBounceCss(bouncex.initActivationFuncs);
	}
		bouncex.loadBrandStyles();
	bouncex.loadWebfonts();

	})();
