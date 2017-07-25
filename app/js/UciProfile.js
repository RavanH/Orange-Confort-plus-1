/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs

    Copyright (C) 2014 - 2017  Orange SA

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/
/**
 * @class Help
 * @classdesc Cette classe permettra d'implémenter l'onglet Help
 */
/*global window */
/*global document: false */
/* global alert */
UciProfile = {
  /*
  * @property
  * @private
   */

  /*
   * @constructor
   */
  InitUciProfile: function () {
    return accessibilitytoolbar.make(["div",
        this.createProfileList(),         
    ])
  },

  /**
   * Create the object array of list elements
   */
  createProfileList: function () {
    var returnSavedProfile = "";
    var profil = null;
    var hideclass = "";
    var i = 0;
    var tableauProfile = ["ul"];
    // allow delete only if there's more than one profile
    var nbprofile = Object.keys(accessibilitytoolbar.userPref.settings.profiles).length;
    if(nbprofile <= 1) {
      hideclass = " uci_hide_trash";
    }
    for (profil in accessibilitytoolbar.userPref.settings.profiles) {
        if(accessibilitytoolbar.userPref.settings.current === profil) {
          returnSavedProfile = ["li",{class: "uci_menu_ouverture_aide uci_menu_space-between uci_menu_active"+hideclass},
                                  ["a", { id: "uci_profile"+i, href:"#", role:"button" , onclick:"UciProfile.loadProfile('"+profil+"','"+accessibilitytoolbar.userPref.settings.profiles[profil]+"','uci_profile"+i+"')", "class":"uci_profil_link" }, profil],
                                  ["div",
                                    ["a", { id: "uci_profile_edit"+i, href:"#", role:"button" , onclick:"UciProfile.editProfile('"+profil+"')", "class":"cdu-icon cdu-icon-edit margin-left-lg", title:"Rename profile : "+profil }],
                                    ["a", { id: "uci_profile_trash"+i, href:"#", role:"button" , onclick:"UciProfile.trashProfile('"+profil+"','uci_profile"+i+"')", "class":"cdu-icon cdu-icon-trash margin-left-lg", title:"Delete profile : "+profil }]
                                  ],
                              ];
        } else {
          returnSavedProfile = ["li",{class: "uci_menu_ouverture_aide uci_menu_space-between"+hideclass},
                                  ["a", { id: "uci_profile"+i, href:"#", role:"button" , onclick:"UciProfile.loadProfile('"+profil+"','"+accessibilitytoolbar.userPref.settings.profiles[profil]+"','uci_profile"+i+"')", "class":"uci_profil_link" }, profil],
                                  ["div",
                                    ["a", { id: "uci_profile_edit"+i, href:"#", role:"button" , onclick:"UciProfile.editProfile('"+profil+"')", "class":"cdu-icon cdu-icon-edit margin-left-lg", title:"Rename profile : "+profil }],
                                    ["a", { id: "uci_profile_trash"+i, href:"#", role:"button" , onclick:"UciProfile.trashProfile('"+profil+"','uci_profile"+i+"')", "class":"cdu-icon cdu-icon-trash margin-left-lg", title:"Delete profile : "+profil }]
                                  ],
                              ];
        }
      tableauProfile.push(returnSavedProfile);
      i++;
    }
    tableauProfile.push(["li",{ "aria-hidden":"true", "role": "presentation", "class":"uci_dropdown-divider"}]);
    if(accessibilitytoolbar.userPref.settings.current === '0') {
      tableauProfile.push(["li",{class: "uci_menu_ouverture_aide uci_menu_active"}, 
          ["a", { id: "uci_profile_none", href:"#", role:"button" }, accessibilitytoolbar.get('uci_predefined_none')]
        ]);
    } else {
      tableauProfile.push(["li",{class: "uci_menu_ouverture_aide"}, 
          ["a", { id: "uci_profile_none", href:"#", role:"button" }, accessibilitytoolbar.get('uci_predefined_none')]
        ]);
    }
    if(accessibilitytoolbar.userPref.settings.current === '1') {
      tableauProfile.push(["li",{class: "uci_menu_ouverture_aide uci_menu_active"}, 
          ["a", { id: "uci_profile_reading", href:"#", role:"button" }, accessibilitytoolbar.get('uci_predefined_improve_readability')],
        ]);
    } else {
      tableauProfile.push(["li",{class: "uci_menu_ouverture_aide"}, 
          ["a", { id: "uci_profile_reading", href:"#", role:"button" }, accessibilitytoolbar.get('uci_predefined_improve_readability')],
        ]);
    }
    if(accessibilitytoolbar.userPref.settings.current === '2') {
      tableauProfile.push(["li",{class: "uci_menu_ouverture_aide uci_menu_active"}, 
          ["a", { id: "uci_profile_layout", href:"#", role:"button" }, accessibilitytoolbar.get('uci_predefined_change_layout')],
        ]);
    } else {
      tableauProfile.push(["li",{class: "uci_menu_ouverture_aide"}, 
          ["a", { id: "uci_profile_layout", href:"#", role:"button" }, accessibilitytoolbar.get('uci_predefined_change_layout')],
        ]);
    }
    if(accessibilitytoolbar.userPref.settings.current === '3') {
      tableauProfile.push(["li",{class: "uci_menu_ouverture_aide uci_menu_active"}, 
          ["a", { id: "uci_profile_move", href:"#", role:"button" }, accessibilitytoolbar.get('uci_predefined_motor_help')],
        ]);
    } else {
      tableauProfile.push(["li",{class: "uci_menu_ouverture_aide"}, 
          ["a", { id: "uci_profile_move", href:"#", role:"button" }, accessibilitytoolbar.get('uci_predefined_motor_help')],
        ]);
    }
    
    return tableauProfile;
  },

  /**
   * Create the content of save profile popin
   * 
   */
  saveProfile: function (){
    var displayInput = "display:none";
    if(accessibilitytoolbar.userPref.settings.current.length < 3) {
      displayInput = "";
    }
    return accessibilitytoolbar.make(["div",{id :"save_profile"},
      ["div", {"class":"save_popin"},
        ["form", {name:"uci_form_profil", action:"#", id:"uci_form_profil"},
          ["div", { id: "uci_save_header", "class": "uci-save-header" },
            ["h2", { id: "uci_save_title", "class": "uci-save-title", "tabindex":"0" }, accessibilitytoolbar.get('save_service')],
            ["button", {"class":"ucibtn-secondary uci-popin-btn", onclick: "UciProfile.hide_save_profile()", id:"uci_discover_close", title:accessibilitytoolbar.get('uci_close_guide'), type:"button"},
              ["span", {"aria-hidden":"true", "class":"cdu-icon cdu-icon-croix"}],
              ["span", {"class":"cdu_n"}, accessibilitytoolbar.get('uci_close_guide')],
            ]
          ],
          ["div", {"class":"margin-top margin-left margin-right" },
            ["div",
              ["label", { "class":"labelcolor","for": "uci-selectProfile" }, accessibilitytoolbar.get('uci_profile_save_label')+" : "],
              UciProfile.selectProfile(),
            ],
            ["div",{id:"uci_profile_name_container", "style":displayInput},
              ["label", { "class":"labelcolor","for":"uci_profile_name" }, accessibilitytoolbar.get('uci_profile_new_label')+" : ",
              ["div",{ id:"uci_profile_info_msg", "class":"uci_profile_info_msg" },accessibilitytoolbar.get('uci_profile_name_format')]],
              ["input", {id: "uci_profile_name", type: "texte", "class":"uci_form-control"}]
            ],
          ],
          ["div", {"class": "margin-top margin-left margin-right padding-bottom" },
            ["input", { name: "saveCancel", onclick:"UciProfile.hide_save_profile()", "type": "reset", "class": "ucibtn-info ucibtn ucibtn-sm", value:accessibilitytoolbar.get('uci_button_cancel')}],
            ["input", { name: "saveSubmit", "type": "submit", "class": "ucibtn-primary ucibtn ucibtn-sm", value:accessibilitytoolbar.get('uci_button_valid')}]
          ]
        ]
      ]
    ])
  },

  /**
   * Create the select option form for the save popin
   * 
   */
  selectProfile: function(){
    var returnAllProfile = "";
    var profil = null;
    var i = 0;
    var tableauSelectProfile = ["select", {id:"uci-selectProfile","class":"uci_select_profile margin-left",onchange: "UciProfile.changeStatus(2)"}];
    tableauSelectProfile.push(["option",{"value":""},accessibilitytoolbar.get('uci_profile_new_option')]);
    for (profil in accessibilitytoolbar.userPref.settings.profiles) {
      // if it's current profile, select it
      if(accessibilitytoolbar.userPref.settings.current === profil) {
        returnAllProfile = ["option",{"value":i,"selected":"selected"},""+profil+""];
      } else {
        returnAllProfile = ["option",{"value":i},""+profil+""];
      }
      tableauSelectProfile.push(returnAllProfile);
      i++;
    }
    UciProfile.close_menu();
    return tableauSelectProfile;
  },

  /**
   * Create the content form "rename" profile option
   * 
   */
  formProfile: function (profilName){
    return accessibilitytoolbar.make(["div",{id :"save_profile"},
      ["div", {"class":"save_popin"},
        ["form", {name:"uci_form_profil", action:"#", id:"uci_form_profil"},
          ["div", { id: "uci_save_header", "class": "uci-save-header" },
            ["h2", { id: "uci_save_title", "class": "uci-save-title", "tabindex":"0" }, accessibilitytoolbar.get('uci_rename_profile')],
            ["button", {"class":"ucibtn-secondary uci-popin-btn", onclick: "UciProfile.hide_save_profile()", id:"uci_discover_close", title:accessibilitytoolbar.get('uci_close_guide'), type:"button"},
              ["span", {"aria-hidden":"true", "class":"cdu-icon cdu-icon-croix"}],
              ["span", {"class":"cdu_n"}, accessibilitytoolbar.get('uci_close_guide')],
            ]
          ],
          ["div", {"class":"margin-top margin-left margin-right"},
            ["div",accessibilitytoolbar.get('uci_profile_curent_name')+" : "+profilName],
            ["input",{ "type":"hidden", id:"previous_profil_name", value:profilName}],
            ["label", { "class":"labelcolor","for": "uci_profile_name" }, accessibilitytoolbar.get('uci_profile_rename_label')+" : ",
            ["div",{ id:"uci_profile_info_msg", "class":"uci_profile_info_msg" },accessibilitytoolbar.get('uci_profile_name_format')]],
            ["input", {id: "uci_profile_name", type: "texte", "class":"uci_form-control"}]
          ],
          ["div", {"class": "margin-top margin-left margin-right padding-bottom" },
            ["input", { name: "saveCancel", onclick:"UciProfile.hide_save_profile()", "type": "reset", "class": "ucibtn-info ucibtn ucibtn-sm", value:accessibilitytoolbar.get('uci_button_cancel')}],
            ["input", { name: "saveSubmit", "type": "submit", "class": "ucibtn-primary ucibtn ucibtn-sm", value:accessibilitytoolbar.get('uci_button_valid_profil')}]
          ]
        ]
      ]
    ])
  },

  /**
   * Display the profile menu
   * 
   */
  uci_show_profile: function(e){
    // when more settings is open, disable quick settings buttons
    if(document.getElementById('uci_right_toolbar').className.match("/uci_mask/")) return false;
    var menu = document.getElementById('uci_cdu_profile');
	  if (document.getElementById('uci_cdu_profile').style.display === "none") {
      document.getElementById('uci_cdu_profile').style.display = "block";
      var button = document.getElementById("uci_activer_profile");
      if(button.nodeName === 'BUTTON') {
        button.title = "profile";
        var li = button.parentNode;
	      li.className = 'uci_inline uci_menu_bton active';
      }
      UciIhm.close_menu(true);      
    } else {
      UciProfile.close_menu();
    }
    accessibilitytoolbar.stopEvt(e);
	  return false;
  },

  /**
   * Close profile menu
   * 
   */
  close_menu: function (nofocus) {
    // if cookie can't be retrieve for security reason, uci_cdu_menu doesn't exist and throw an error
    // fix issue #11 https://github.com/Orange-OpenSource/Orange-Confort-plus/issues/11
    if(document.getElementById('uci_cdu_profile'))
    {
		  document.getElementById('uci_cdu_profile').style.display = "none";
      var button = document.getElementById("uci_activer_profile");
      if(button.nodeName === 'BUTTON') {
        button.title = "profile";
		    var li = button.parentNode;
		   li.className = 'uci_inline uci_menu_bton';
      }
      if(nofocus) return false;
      document.getElementById("uci_activer_profile").focus();
    }
  },

  /**
   * Hide the popin
   * 
   */
  hide_save_profile: function(){
    document.getElementById("uci_cdu_popin").style.display = "none";
    document.getElementById("uci_cdu_popin").removeChild(document.getElementById("save_profile"));
  },

  /**
   * Manage profile option update to display the input field for new profile option 
   * 
   */
  changeStatus:function(){
    if (document.getElementById('uci-selectProfile').value !== ""){
      document.getElementById("uci_profile_name_container").style.display = "none";
    } else {
      document.getElementById("uci_profile_name_container").style.display = "inline";
    }
  },

  /**
   * Display the save profile popin
   * 
   */
  showProfilePopin: function(){
    UciIhm.hide_confirm_validation();
    document.getElementById("uci_cdu_popin").appendChild(UciProfile.saveProfile());
    document.getElementById("uci_cdu_popin").style.display= "block";
    document.getElementById("uci_cdu_popin").style.height = document.getElementsByTagName("body")[0].clientHeight+"px";
    accessibilitytoolbar.uciAttachEvent('submit','onsubmit',document.getElementById('uci_form_profil'), function(e) {accessibilitytoolbar.stopEvt(e);UciProfile.checkProfileName();});
  },

  /**
   * Check if profileName lenght is more than 3 char and alphanum only, otherwise, display an error message in the popin
   * 
   */
  checkProfileName: function() {
    // check if there's a profile named
    var profilName;
    if((document.getElementById('uci-selectProfile') && document.getElementById('uci-selectProfile').value === "") 
      || document.getElementById("previous_profil_name")) {
      // if value == "" that's a new profile
      profilName = document.getElementById('uci_profile_name').value;
      // check if profile name is alpha num with accent and special languages chars, but not parenthesis, punct or others symbol
      if(profilName.length < 3 || !profilName.match(/^[A-Za-z0-9\u00C0-\u02AF\u0390-\u0556 !\u00F7]+$/)) {
        // display the error message into the popin
        document.getElementById("uci_profile_name").style.borderColor = "#cd3c14";
        return false;
      }
    }
    UciValidation.Validation();
    UciProfile.hide_save_profile();
    UciIhm.confirm_validation();
  },

  /**
   * Attach events to the profile menu
   * 
   */
  create_menu_events: function() {
    /********** Profile *********************/
    accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_activer_profile'),UciProfile.uci_show_profile);
    accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_profile_none'),function(e){accessibilitytoolbar.stopEvt(e);UciProfile.loadProfile('0',accessibilitytoolbar.userPref.defautStoredValue,"uci_profile_none")});
    accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_profile_reading'),function(e){accessibilitytoolbar.stopEvt(e);UciProfile.loadProfile('1',"0000651000650650650001100110000000006500100010","uci_profile_reading")});
    accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_profile_layout'),function(e){accessibilitytoolbar.stopEvt(e);UciProfile.loadProfile('2',"0000651000650650650111101310000000006500000010","uci_profile_layout")});
    accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_profile_move'),function(e){accessibilitytoolbar.stopEvt(e);UciProfile.loadProfile('3',"0000651000650650650001100310000101006500000010","uci_profile_move")});
  },

  /**
   * Refresh profile list
   * 
   */
  refreshMenuDisplay: function() {
    // update profile list
    document.getElementById("uci_cdu_profile").replaceChild(this.InitUciProfile(),document.getElementById("uci_cdu_profile").firstChild);
    // add event to profile menu
    this.create_menu_events();
  },

  /**
   * Load a profile on option update
   * 
   */
  loadProfile: function(profilName,settingsValue,idCible) {
    e = window.event;
    accessibilitytoolbar.stopEvt(e);
    if(profilName) {
      accessibilitytoolbar.userPref.settings.current = profilName;
      accessibilitytoolbar.userPref.readUserPref();
      accessibilitytoolbar.updateIhmFormsSettings();
      accessibilitytoolbar.saveUserPref();
    }
    // update the selected element
    if(idCible) {
      var parent = document.getElementById(idCible).parentNode;
      var sibblings = parent.parentNode.childNodes;
      var curNode;
      // remove uci_menu_active from all 
      for(curNode in sibblings) {
        if(sibblings[curNode].className) {            
          sibblings[curNode].className = sibblings[curNode].className.replace(/ uci_menu_active{0,1}/,"");
        }
      }
      // add uci_menu_active class to selected element
      parent.className += " uci_menu_active";
    }
  },

  /**
   * edit a profil
   * 
   */
  editProfile: function(profilName) {
    e = window.event;
    accessibilitytoolbar.stopEvt(e);
    this.close_menu();
    UciIhm.hide_confirm_validation();
    document.getElementById("uci_cdu_popin").appendChild(UciProfile.formProfile(profilName));
    document.getElementById("uci_cdu_popin").style.display= "block";
    document.getElementById("uci_cdu_popin").style.height = document.getElementsByTagName("body")[0].clientHeight+"px";
    accessibilitytoolbar.uciAttachEvent('submit','onsubmit',document.getElementById('uci_form_profil'), function(e) {accessibilitytoolbar.stopEvt(e);UciProfile.checkProfileName();});
  },

  /**
   * remove a profil
   * 
   */
  trashProfile: function(profilName,idToRemove) {
    var profilok = false;
    e = window.event;
    accessibilitytoolbar.stopEvt(e);
    if(confirm(accessibilitytoolbar.get('uci_profile_delete_warning'))) {
      delete accessibilitytoolbar.userPref.settings.profiles[profilName];
      // if it's the current profile, check if there's another to set
      if(accessibilitytoolbar.userPref.settings.current === profilName) {
        accessibilitytoolbar.userPref.settings.current = "";
        // load empty settings
        this.loadProfile('0',accessibilitytoolbar.userPref.defautStoredValue,"uci_profile_none");
      }
      var parentDelete = document.getElementById(idToRemove).parentNode;
      var parentDeleteParent = parentDelete.parentNode;
      parentDeleteParent.removeChild(parentDelete);
      var nbprofile = Object.keys(accessibilitytoolbar.userPref.settings.profiles).length;
      if(nbprofile <= 1) {
        parentDeleteParent.firstChild.className += " uci_hide_trash";
      }
      accessibilitytoolbar.saveUserPref();
    }
  }
}
