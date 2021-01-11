    var userSettings = JSON.parse(localStorage.getItem('Settings') ? localStorage.getItem('Settings') : "{}");
    
    function defaultThemeColor() {
      try {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
        } else return 'light';
      } catch (err) {
          return 'light';
      };
    };
    function toggleCheck() {
      if (document.getElementById("darkModeCheck").checked === true) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); // salva preferenza per future visite
      }
      else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); // salva preferenza per future visite
      };    
    };
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);

      if (currentTheme === 'dark') {
        var checkBoxes = $("input[name=darkModeCheck]");
        checkBoxes.attr('checked', true);
      };
    } else {
      if (defaultThemeColor() == 'dark') { // check OS settings and set dark theme if necessary
        document.documentElement.setAttribute('data-theme', 'dark');
        var checkBoxes = $("input[name=darkModeCheck]");
        checkBoxes.attr('checked', true);
      };
    };
    
    function setWindow(current) {
      scrollTo(0,0);
      //currentTab = current; // For swipe function
      document.getElementById('welcome').style.display='none';
      document.getElementById('add_window').style.display='none';
      document.getElementById('manage_window').style.display='none';
      document.getElementById('advanced_window').style.display='none';
      document.getElementById('calculate_window').style.display='none';
      document.getElementById('extras_window').style.display='none';

      document.getElementById('settings_window').style.display='none';
      document.getElementById('my_teams_window').style.display='none';
      document.getElementById('raid_map').style.display='none';
      document.getElementById('saved_teams_stats').style.display='none';
      //toolbar
      document.getElementById("icon-bar_add_window").className = "";
      document.getElementById("icon-bar_manage_window").className = "";
      document.getElementById("icon-bar_advanced_window").className = "";
      document.getElementById("icon-bar_calculate_window").className = "";
      document.getElementById("icon-bar_settings_window").className = "";

      document.getElementById("icon-bar_real_settings_window").className = "";
      document.getElementById("icon-bar_my_teams_window").className = "";
      document.getElementById("icon-bar_raid_map_window").className = "";
      document.getElementById("icon-bar_team_stats_window").className = "";

      switch (current) {
        case 'add_window':
          document.getElementById('add_window').style.display='block';
          document.getElementById("icon-bar_add_window").className = "active-icon-bar";
          break;
        case 'manage_window':
          document.getElementById('manage_window').style.display='block';
          document.getElementById("icon-bar_manage_window").className = "active-icon-bar";
          break;
        case 'advanced_window':
          document.getElementById('advanced_window').style.display='block';
          document.getElementById("icon-bar_advanced_window").className = "active-icon-bar";
          break;
        case 'calculate_window':
          document.getElementById('calculate_window').style.display='block';
          document.getElementById("icon-bar_calculate_window").className = "active-icon-bar";
          break;
        case 'extras_window':
          document.getElementById('extras_window').style.display='block';
          document.getElementById("icon-bar_settings_window").className = "active-icon-bar";
          break;
        case 'settings_window':
          document.getElementById('settings_window').style.display='block';
          document.getElementById("icon-bar_settings_window").className = "active-icon-bar";
          document.getElementById("icon-bar_real_settings_window").className = "active-icon-bar";
          break;
        case 'my_teams_window':
          document.getElementById('my_teams_window').style.display='block';
          document.getElementById("icon-bar_my_teams_window").className = "active-icon-bar";
          document.getElementById("icon-bar_settings_window").className = "active-icon-bar";
          break;
        case 'raid_map':
          document.getElementById('raid_map').style.display='block';
          document.getElementById("icon-bar_raid_map_window").className = "active-icon-bar";
          document.getElementById("icon-bar_settings_window").className = "active-icon-bar";
          break;
        case 'saved_teams_stats':
          document.getElementById('saved_teams_stats').style.display='block';
          document.getElementById("icon-bar_team_stats_window").className = "active-icon-bar";
          document.getElementById("icon-bar_settings_window").className = "active-icon-bar";
          break;
      };
    };

    function welcome_toggle(id,menu) {
      welcome_menu = document.getElementsByName("welcome_element");
      for (var i = 0; i<welcome_menu.length; i++) {
        $(welcome_menu[i]).removeClass('active_welcome');
      };
      $(menu).addClass('active_welcome');

      document.getElementById("welcome_message").style.display = "none";
      document.getElementById("whats_new_content").style.display = "none";
      document.getElementById("instructions_content").style.display = "none";
      document.getElementById("cool_websites_content").style.display = "none";
      document.getElementById("credits_content").style.display = "none";
      switch (id) {
        case 'welcome':
          document.getElementById("welcome_message").style.display = "block";
          break;
        case 'whats_new':
          document.getElementById("whats_new_content").style.display = "block";
          break;
        case 'instructions':
          document.getElementById("instructions_content").style.display = "block";
          break;
        case 'cool_websites':
          document.getElementById("cool_websites_content").style.display = "block";
          break;
        case 'credits':
          document.getElementById("credits_content").style.display = "block";
          break;
      };
    };


  var Notification = window.Notification || window.mozNotification || window.webkitNotification;
  // NOTIFICATION
  function checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch(e) {
      return false;
    }

    return true;
  }
  var riceviNotifiche = userSettings.notification;

  if (riceviNotifiche === true) {
    var checkBoxes = $("#notifications_toggle");
    checkBoxes.attr('checked', true);
  };
  function switchNotifiche() {
    if ('permissions' in navigator) {
      if (riceviNotifiche == true) {
        riceviNotifiche = false;
        document.getElementById("notifications_toggle").checked = false;
      } else {
        riceviNotifiche = true;
        document.getElementById("notifications_toggle").checked = true;
      };
      app.writeSettings();
    };
  };

  function askNotificationPermission() {
    // Chiedi il permesso
    function handlePermission(permission) {
      // Conserva l'informazione
      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }
      if (permission == "granted") {
        switchNotifiche();
      } else document.getElementById("notifications_toggle").checked = false;
    };

    // Controlla se il browser supporta notifiche
    if (!(Notification)) {
      console.log("This browser does not support notifications.");
    } else {
      if(checkNotificationPromise()) {
        Notification.requestPermission()
        .then((permission) => {
          handlePermission(permission);
        });
      } else {
        Notification.requestPermission(function(permission) {
          handlePermission(permission);
        });
      };
    };
  };

  function setToolbarPosition (f) {
    var f = f!=undefined ? f : "hor", appDoc = document.getElementById("app");
    if (f === "hor") {
      appDoc.style.marginLeft = "0";
      appDoc.style.marginBottom = "70px";
      document.getElementById("icon-bar_real_settings_window").style.display = "none";
      document.getElementById("icon-bar_my_teams_window").style.display = "none";
      document.getElementById("icon-bar_raid_map_window").style.display = "none";
      document.getElementById("icon-bar_team_stats_window").style.display = "none";
      document.getElementById("icon-bar_settings_window").style.display = "";
      document.getElementById("toolbar").className = "icon-bar";
    } else {
      appDoc.style.marginLeft = "90px";
      appDoc.style.marginBottom = "0";
      document.getElementById("icon-bar_settings_window").style.display = "none";
      document.getElementById("icon-bar_real_settings_window").style.display = "";
      document.getElementById("icon-bar_my_teams_window").style.display = "";
      document.getElementById("icon-bar_raid_map_window").style.display = "";
      document.getElementById("icon-bar_team_stats_window").style.display = "";
      document.getElementById("toolbar").className = "vertical-icon-bar";
    };
  };

  if (userSettings.verticalToolbar === undefined) {
    if (screen.width > 800 && screen.height >= 600) { // set vertical toolbar
      $("#toolbar_position").attr('checked', true);
      setToolbarPosition("ver");
    };
  } else {
    if (userSettings.verticalToolbar === true) {
      $("#toolbar_position").attr('checked', true);
      setToolbarPosition("ver"); 
    };
  };
  function toggleVerticalToolbar() {
    if (document.getElementById("toolbar_position").checked === true) setToolbarPosition("ver");
    else setToolbarPosition ();
    app.writeSettings();
  };

  if (userSettings.heroNameInGrid === true) $("#heroNameInGrid").attr('checked', true);
  function toggleNamesInGrid () {
    userSettings.heroNameInGrid = document.getElementById("heroNameInGrid").checked;
    app.showNamesInGrid = document.getElementById("heroNameInGrid").checked;
    app.writeSettings();
  };

  function openImage (link){
    $( "body" ).append(`
      <div id="imageViewer" style="z-index: 60; position: relative;">
        <div style="position: fixed; top: 0; left: 0; overflow-y: auto; scrollbar-width:initial; background-color: #0007; height: 100%; width: 100%;" onclick="$('#imageViewer').remove();$('body').removeClass('modal-open');">
          <img id="imageViewerObj" src="` + link + `" style="display: block; animation: animatezoom 0.4s; object-fit: scale-down;height: 100%;width: 100%;">
          <div style="width: 60px;height: 60px;position: fixed;right: 20px;top: 20px;background-color: #0006;border-radius: 40px;text-align: center;font-size: 48px;color: #fff8;cursor: pointer">x</div>
        </div>
        <div style="width: 60px;height: 60px;position: fixed;right: 20px;bottom: 20px;background-color: #0006;border-radius: 40px;text-align: center;font-size: 38px;color: #fff8;cursor: pointer" onclick="var img = document.getElementById('imageViewerObj'); if (img.style.objectFit === 'scale-down') {img.style.objectFit= ''; img.style.height='100%'; img.style.width='auto'; img.style.margin = 'auto'; this.children[0].className='fa fa-search-minus'} else {img.style.objectFit= 'scale-down'; img.style.height='100%'; img.style.width='100%'; this.children[0].className='fa fa-search-plus';};">
          <i class="fa fa-search-plus" aria-hidden="true" style="margin-top: 10px;"></i>
        </div>
      </div>
    `);
    $("body").addClass("modal-open");
  };


  //// context menu
  var showValues = false;
  if (showValues == true) {
    var checkBoxes = $("#showValues_toggle");
    checkBoxes.attr('checked', true);
  };
  function toggleDebugValues() {
    if (showValues == true) {
      showValues = false;
      document.getElementById("showValues_toggle").checked = false;
    } else {
      showValues = true;
      document.getElementById("showValues_toggle").checked = true;
    };
  };
  function getPosition(e) {
    var posx = 0;
    var posy = 0;

    if (!e) var e = window.event;

    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + 
                        document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + 
                        document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy
    };
  };

  var tastoDestro = 0;
  if (document.addEventListener) {
    document.addEventListener('click', function(e) {
      if ($(e.target).parents("#debugHeroInfo").length>0 ) return;
      if (tastoDestro != 0) {
        tastoDestro = 0;
        $('#debugHeroInfo').remove();
      }; 
    }); 
    document.addEventListener('contextmenu', function(e) {
      if (document.getElementById("debugHeroInfo") != null)
        if (tastoDestro != 0) {
          tastoDestro = 0;
          $('#debugHeroInfo').remove();
        }; 
    }, false);
  } else {
    document.attachEvent('oncontextmenu', function() {
      window.event.returnValue = false;
    });
  };
  function debugRightMenu(e,hero){
    tastoDestro = 1;
    var posX, posY;
    let clickCoords = getPosition(e);
    let clickCoordsX = clickCoords.x;
    let clickCoordsY = clickCoords.y;

    let menuWidth = 200 + 4;
    let menuHeight = 480 + 4;
    let currentYPosition = e.pageY;
    
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    if ( (windowWidth - clickCoordsX - 50) < menuWidth ) {
      posX = clickCoordsX - menuWidth - 15 + "px";
    } else {
      posX = clickCoordsX + "px";
    }

    if ( (windowHeight - e.clientY - 50) < menuHeight ) {
      posY = clickCoordsY + windowHeight - e.clientY - menuHeight - 50 + "px";
    } else {
      posY = clickCoordsY + "px";
    }

    var topics = "";
    for (var key in app.HeroDB[hero].camping.values) {
      topics += `<div style="border-bottom: 1px solid grey;">` + app.translateTopics(key) + " " + '<span style="float: right;">' + app.HeroDB[hero].camping.values[key] + '</span></div>'
    };
    $( "#app" ).append(`
    <div id="debugHeroInfo" class="blur" style="z-index: 1; width:200px;position:absolute; top:` + posY + `; left:` + posX + `; padding: 10px;">
      ` + "<center>" + app.thisHeroTranslatedName(hero) + "</center>" +
      `<div style="font-size:12px">` +
        app.strings.topics + ": " + app.translateTopics(app.HeroDB[hero].camping.topics[0]) + ", " +  app.translateTopics(app.HeroDB[hero].camping.topics[1]) + "<br><br>" +
        topics
      + `</div>
      </div>
    `);
    e.preventDefault(); // hide left click
  };

  function mandaNotificaCompletamento(){
    if (riceviNotifiche == true) {
      if (document.visibilityState != 'visible') {
        var icon = "./favicons/android-chrome-192x192.png" // "https://cdn.glitch.com/5c21c869-ea9a-48ba-b019-90cd493f45cd%2Fcamp-fire-icon%20small.png?v=1585067234171"
        var notification = new Notification(app.strings.notification_title, { body: app.strings.notification_ready, icon: icon }); // manda notifica di completamento
      };
    };
  };

  function snackbarMessage(text) {
    //$( "#snackbar" ).text(text);
    var x = document.getElementById("snackbar");
    x.innerHTML = text;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  };

  function sendTeamUsageStatistics(data) {
    $.ajax({
        url: "https://ceciliabotgithub.glitch.me/team_statistics",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify( data ),
        success: function (response) {
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log("could not upload team data");
        }
    });
  };

  function generateUrl(roster) {
    var baseURL = window.location.origin;
    var encodeRoster = btoa(JSON.stringify(Object.keys(roster)));
    return baseURL + window.location.pathname + "?camproster=" + encodeRoster;
  };
  function copyText(id){
    var elm = document.getElementById(id);
    if(document.body.createTextRange) {// for Internet Explorer
      var range = document.body.createTextRange();
      range.moveToElementText(elm);
      range.select();
      document.execCommand("Copy");
    }
    else if(window.getSelection) {// other browsers
      var selection = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(elm);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("Copy");
    };
    snackbarMessage("Copied to clipboard");
  };

  ///Component
  const pagination = {
    name: 'pagination',
    template: '#pagination',
    props: {
      maxVisibleButtons: {
        type: Number,
        required: false,
        default: 4
      },
      totalPages: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      },
      perPage: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      },
    },
    computed: {
      pages() {
        const range = [];
        var remainingLeft = 0;
        var remainingRight = 0;
        var endPage = this.currentPage + Math.floor(this.maxVisibleButtons/2);
        var startPage = this.currentPage - Math.ceil(this.maxVisibleButtons/2);
        if ( endPage>this.totalPages ) remainingRight = endPage-this.totalPages, endPage = this.totalPages;
        if (startPage<1) remainingLeft = Math.abs( 1-startPage ), startPage = 1;
        endPage += remainingLeft;
        startPage -= remainingRight;
        if ( endPage>this.totalPages ) endPage = this.totalPages;
        if (startPage<1) startPage = 1;

        for (let i = startPage; i <= endPage; i+= 1 ) {
          if (i>0) {
            range.push({
              name: i,
              isDisabled: i === this.currentPage 
            });
          };
        };

        return range;
      },
      isInFirstPage() {
        return this.currentPage === 1;
      },
      isInLastPage() {
        return this.currentPage === this.totalPages;
      },
    },
    methods: {
      onClickFirstPage() {
        this.$emit('pagechanged', 1);
      },
      onClickPreviousPage() {
        this.$emit('pagechanged', this.currentPage - 1);
      },
      onClickPage(page) {
        this.$emit('pagechanged', page);
      },
      onClickNextPage() {
        this.$emit('pagechanged', this.currentPage + 1);
      },
      onClickLastPage() {
        this.$emit('pagechanged', this.totalPages);    
      },
      isPageActive(page) {
        return this.currentPage === page;
      },
    }
  };
  const hero_icon = {
    name: 'hero_icon',
    template: '#hero_icon',
    props: {
      data: {
        type: Object,
        required: true,
        default: {}
      },
      name: {
        type: String,
        required: false,
        default: "Name"
      },
      removable: {
        type: Boolean,
        required: false,
        default: false
      },
      selected: {
        type: Boolean,
        required: false,
        default: false
      },
      displayname: {
        type: Boolean,
        required: false,
        default: false
      },
      role_attr: {
        type: Boolean,
        required: false,
        default: true
      },
      showstars: {
        type: Boolean,
        required: false,
        default: false
      },
      hoverable: {
        type: Boolean,
        required: false,
        default: true
      },
      size: {
        type: Number,
        required: false,
        default: 75
      },
      scale: {
        type: Number,
        required: false,
        default: 1
      }
    },
    data: function() {
      return {
        //selected: false,
      }
    },
    computed: {
      sizeStyle: function() {
        return {height: this.size*this.scale + "px", width: this.size*this.scale + "px"};
      },
      textFieldSize: function() {
        return {"width": (this.size*this.scale + (this.removable ? 20*this.scale : 0) ) + "px", fontSize: 16*this.scale+"px", height: 38*this.scale+"px"};
      },
    },
    methods: {
      imgSrc: function () {
        return "https://assets.epicsevendb.com/_source/face/" + this.data.id + "_s.png";
        //return this.$root.getHeroAssets(this.data._id).icon;
      },
      isSelected: function(hero) {
        return this.selected;
      },
      assetsRole: function(role) {
        switch (role) {
          case "manauser":
            return "https://assets.epicsevendb.com/class/cm_icon_role_soul-weaver.png"
            break;
          case "assassin":
            return "https://assets.epicsevendb.com/class/cm_icon_role_thief.png"
            break;
          case "warrior":
            return "https://assets.epicsevendb.com/class/cm_icon_role_warrior.png"
            break;
          case "mage":
            return "https://assets.epicsevendb.com/class/cm_icon_role_mage.png"
            break;
          case "ranger":
            return "https://assets.epicsevendb.com/class/cm_icon_role_ranger.png"
            break;
          default:
            return "https://assets.epicsevendb.com/class/cm_icon_role_knight.png"
        }
      },
      assetsAttribute: function(attr) {
        switch (attr) {
          case "fire":
            return "https://assets.epicsevendb.com/attribute/cm_icon_profire.png"
            break;
          case "ice":
            return "https://assets.epicsevendb.com/attribute/cm_icon_proice.png"
            break;
          case "wind":
            return "https://assets.epicsevendb.com/attribute/cm_icon_proearth.png"
            break;
          case "light":
            return "https://assets.epicsevendb.com/attribute/cm_icon_prolight.png"
            break;
          case "dark":
            return "https://assets.epicsevendb.com/attribute/cm_icon_promdark.png"
            break;
          default:
            return "https://assets.epicsevendb.com/attribute/cm_icon_profire.png"
        }
      },
      remove: function(key,event) {
        this.$emit('remove', key);
      },
      emitLeftClick(e, event) {
        if ( event.target.className.indexOf('removeHero') !=-1 ) return this.remove(e,event);
        this.$emit('clicked', e);
      },
      emitRightClick(e, event) {
        this.$emit('contextmenu', event, e);
      }
    },
    watch: {
    },
    beforeDestroy: function(){
      //console.log('DESTROYYYY!!!');
      //this.$destroy(true);
    }
  };
  const hero_selector = {
    name: 'hero_selector',
    template: '#hero_selector',
    components: {
      "hero-icon": hero_icon
    },
    props: {
      selectable: {
        type: Array,
        required: true,
        default: []
      },
      selected: {
        type: Array,
        required: false,
        default: []
      },
      title: {
        type: String,
        required: false,
        default: undefined
      },
      slotnumber: {
        type: String,
        required: false,
        default: "0"
      },
      forceSelection: {
        type: Boolean,
        required: false,
        default: false
      },
      maxSelectable: {
        type: Number,
        required: false,
        default: -1
      }
    },
    data: function () {
      return {
        inputField: false,
        inputCharacter: "",
        filtering: false,
        filters: {attribute: ["all","fire","ice","wind","light","dark"], role: ["all", "warrior", "knight", "assassin", "ranger", "mage", "manauser"], rarity: ["all", 5, 4, 3, "selected"]},
        filter: {},
        filteredData: this.selectable
      }
    },
    computed: {
      heroes: function() {
        let tmp = {};
        for (var i in this.selectable) {
          tmp[this.selectable[i]] = this.$root.HeroDB[this.selectable[i]];
        };
        return tmp;
      },
      modalTitle: function () {
        if (!this.title) return this.strings.multilock_slot + " " + (parseInt(this.slotnumber) + 1);
        return title;
      },
      strings: function () {
        try {
          return this.$root.strings;
        } catch (err) { /* for safety */
          console.log(err);
          return {};
        };
      },
      numberSelected: function () {
        return this.selected.length;
      }
    },
    methods: {
      hero: function (id) {
        return this.heroes[id];
      },
      isSelected: function (hero) {
        return this.selected.includes(hero);
      },
      assetsRole: function(role) {
        switch (role) {
          case "manauser": 
            return "https://assets.epicsevendb.com/class/cm_icon_role_soul-weaver.png"
            break;
          case "assassin": 
            return "https://assets.epicsevendb.com/class/cm_icon_role_thief.png"
            break;
          case "warrior": 
            return "https://assets.epicsevendb.com/class/cm_icon_role_warrior.png"
            break;
          case "mage": 
            return "https://assets.epicsevendb.com/class/cm_icon_role_mage.png"
            break;
          case "ranger": 
            return "https://assets.epicsevendb.com/class/cm_icon_role_ranger.png"
            break;
          default:
            return "https://assets.epicsevendb.com/class/cm_icon_role_knight.png"
        }
      },
      assetsAttribute: function(attr) {
        switch (attr) {
          case "fire": 
            return "https://assets.epicsevendb.com/attribute/cm_icon_profire.png"
            break;
          case "ice": 
            return "https://assets.epicsevendb.com/attribute/cm_icon_proice.png"
            break;
          case "wind": 
            return "https://assets.epicsevendb.com/attribute/cm_icon_proearth.png"
            break;
          case "light": 
            return "https://assets.epicsevendb.com/attribute/cm_icon_prolight.png"
            break;
          case "dark": 
            return "https://assets.epicsevendb.com/attribute/cm_icon_promdark.png"
            break;
          default:
            return "https://assets.epicsevendb.com/attribute/cm_icon_profire.png"
        }
      },
      select: function(e) {
        if (this.selected.includes(e)) {
          this.selected.splice(this.selected.indexOf(e), 1)
        } else {
          this.selected.push(e);
        }
      },
      localizedName: function (id) {
        if (this.translatedNames[id]) return this.translatedNames[id];
        else return "";
      },
      isActiveFilter: function (type, filter) {
        let slectedStyle = {"backgroundColor": "var(--icon-bar-active)", borderRadius: "10px"};
        if (this.filter[type]) {
          if (this.filter[type] == filter) return slectedStyle;
        };
        if (!this.filter[type] && filter == "all") return slectedStyle;
        return {"backgroundColor": "transparent"}; // no background-color
      },
      heroesFilter: function() {
        var tmp = JSON.parse(JSON.stringify(this.heroes)); // make a copy
        let text = this.inputCharacter.toLowerCase();
        for (var hero in tmp){
          if (text && tmp[hero].name.toLowerCase().indexOf(text) == -1 && this.name.toLowerCase().indexOf(text) == -1) {delete tmp[hero];continue};
          for (var i in this.filter) {
            if (!tmp[hero]) break;
            if (isNaN(this.filter[i]) && this.filter[i].toLowerCase() == "all") continue;
            if (isNaN(this.filter[i]) && this.filter[i] == "selected" && this.isSelected(hero)) continue;
            if (tmp[hero][i] != this.filter[i]) delete tmp[hero];
          };
        };
        this.filteredData = Object.keys(tmp);
      },
      changeFilter: function(type,value) {
        this.filter[type] = value;
        this.heroesFilter();
      },
      openSearchBar: function() {
        this.inputField=true; 
        this.filtering=false;
        this.$nextTick(() => {
          this.$refs.editInputField.focus();
        });
      },
      removeSearchBar: function () {
        this.inputCharacter = "";
        this.inputField = false;
      },
      ranodomClick: function (e) {
        e.preventDefault();
        if (e.target.className=="modal") return this.closeModal();
        //else console.log(e);
      },
      emitRightClick(e,event) {
        this.$emit('right-click', e,event);
      },
      closeModal() {
        if (this.forceSelection && this.selected.length==0) return; // must select something
        this.$emit('close-modal', this.selected);
        this.$destroy(true);
      }
    },
    watch: {
      inputCharacter: function () {
        this.filter = {}; //remove filters when searching by name
        this.heroesFilter();
      },
    },
    mounted: function() {
    },
    beforeDestroy: function() {
    }
  };

    var app = new Vue({
        el: '#app',
        components: {
          pagination: pagination,
          "hero-icon": hero_icon,
          hero_selector: hero_selector
        },
        data: function () {
            return {
              VERSION: 1.0,
              last_version: localStorage.getItem('last_version'), /* if different from VERSION a popup will appear*/
              avatars: JSON.parse(localStorage.getItem('avatars') || '{"name": false, "role_attr": true, "stars": false, "scale": 1, "hoverable": true, "notSet": true}'),
              strings: {},
              HeroDB: {},
              sortedHeroDB: [],
              displayList: [],
              buffList: {
                "stic_debuf_impossible": {"name": "Immunity", "id": 12},
                "stic_att_up": {"name": "Attack up", "id": 1},
                "stic_att_up2": {"name": "Attack up (Greater)", "id": 44},
                "stic_def_up": {"name": "Defense up", "id": 2},
                "stic_speed_up": {"name": "Speed up", "id": 3},
                "stic_dodge_up": {"name": "Evasion", "id": 10},
                "stic_protect": {"name": "Barrier", "id": 5},
                "stic_cri_up": {"name": "Crit chance up", "id": 4},
                "stic_cridmg_up": {"name": "Crit damage up", "id": 9},
                "stic_crires_up": {"name": "Crit Resistance", "id": 40},
                "stic_invincible": {"name": "Invincibility", "id": 6},
                "stic_endure": {"name": "Skill nullifier", "id": 46},
                "stic_heal": {"name": "Continuous Healing", "id": 11},
                "stic_hide": {"name": "Stealth", "id": 15},
                "stic_immortality": {"name": "Immortality", "id": 14},
                "stic_reflect": {"name": "Reflect", "id": 13},
                "stic_counter": {"name": "Counter", "id": 7}
              },
              debuffList: {"stic_def_dn": {"name": "Def down", "id": 18},
                "stic_speed_dn": {"name": "Speed down", "id": 19},
                "stic_att_dn": {"name": "Attack down", "id": 17},
                "stic_blind": {"name": "Blind", "id": 22},
                "stic_target": {"name": "Target", "id": 26},
                "stic_buf_impossible": {"name": "Unbuffable", "id": 29},
                "stic_heal_impossible": {"name": "Unhealable", "id": 27},
                "stic_stun": {"name": "Stun", "id": 20},
                "stic_provoke": {"name": "Provoke", "id": 25},
                "stic_silence": {"name": "Silence", "id": 28},
                "stic_sleep": {"name": "Sleep", "id": 21},
                "stic_blood": {"name": "Bleed", "id": 32},
                "stic_dot": {"name": "Poison", "id": 24},
                "stic_blaze": {"name": "Burn", "id": 31},
                "stic_vampire": {"name": "Vampire", "id": 23},
                "stic_bomb": {"name": "Bomb", "id": 53}
              },
              myHeroesList: {},
              displayMyHeroes: [],
              rosterLength: 0,
              locked: [],
              classe: [],
              elemento: [],
              debuffs: [],
              buffs: [],
              AoE: false,
              noS1debuffs: false,
              noDebuffs:  false,
              mustIncludeDispel: false,
              cartesian_lock: [[],[],[],[]],
              isSelectingCartesian: false,
              risultati: [],
              currentResultsPage: 1,
              topSavedCamps: [],
              topSavedCampsPage: 1,
              savedCamps: JSON.parse(localStorage.getItem('savedCamps') ? localStorage.getItem('savedCamps') : "{}"),
              displaySavedCamps: Object.keys(JSON.parse(localStorage.getItem('savedCamps') ? localStorage.getItem('savedCamps') : "{}")),
              customizedResuts: {numeroMassimo: true, n: 200, minMorale: false, morale: 0, noImmagini: false},
	            displayStyle: "grid",
	            isLoadingResults: false,
              inizializzazione: true, //nascondi tutto durante il caricamento iniziale di vue
              numeroCombinazioniPossibili: "/",
              lingua: "en", // Just a placeholder during boot, language is set at line 1701 and 1705
              lockType: 1,
              translatedName:{}
            };
        },
        methods: {
          changeResultsPage: function (page) {
            scrollTo(0,0)
            this.currentResultsPage = page;
          },
          heroId: function (hero) {
            return this.HeroDB[hero].id;
          },
          thisHeroData: function(hero) {
            return this.HeroDB[hero]
          },
          thisHeroTranslatedName: function(heroid) {
            if (!heroid) return; 
            if (this.translatedName[heroid]) {
              return this.translatedName[heroid]
            } else {
              if (!this.thisHeroData(heroid)) return heroid;
              return this.thisHeroData(heroid).name;
            }
          },
          getHeroAssets: function (_id, f) {
            if (this.HeroDB[_id]){
              if (!this.HeroDB[_id].assets) this.HeroDB[_id].assets = {icon: 'https://assets.epicsevendb.com/_source/face/' + this.thisHeroData(_id).id + '_s.png'};
              if (f === "onerror") this.HeroDB[_id].assets = {icon: 'https://cdn.glitch.com/65215d7c-0b60-4f17-a9c0-8d87bc9fa1d9%2F' + this.thisHeroData(_id).id + '_s.png'};
              return this.HeroDB[_id].assets;
            } else return {icon: ""};
          },
          capitalize: function(string) {
              return string[0].toUpperCase() + string.slice(1).replace(/-/gi," "); 
          },
          updateUserData: function() { // aggiorna i dati sul server
            localStorage.setItem('Heroes', JSON.stringify(this.myHeroesList) );
          },
          addHero: function (hero) {
            if (!this.myHeroesList[hero]) {
              //this.myHeroesList.push(hero);
              this.myHeroesList[hero] = this.HeroDB[hero]; // aggiunge l'object del nuovo eroe
              this.rosterLength +=1; // usa per indicare a vue che qualcosa è cambiato
              this.filtroTuttiGliEroi({className: "search_hero_filter", name: "", value: ""}); // <=="Add Heroes" screen / aggiorna i filtri per evitare bug se l'opzione nascondi eroi già in team è attiva
              this.filtroTuttiGliEroi({className: "search_hero_filter", name: "", value: ""}, "MyHeroes"); // <== "Manage Heroes" screen / aggiorna i filtri per evitare bug se l'opzione nascondi eroi già in team è attiva
              this.updateUserData();
            }
          },
          addShownHeroes: function () {
            for (var i = 0; i < this.displayList.length; i++) {
              this.myHeroesList[this.displayList[i]] = this.HeroDB[this.displayList[i]];
            };
            this.rosterLength = Object.keys(this.myHeroesList).length; // Update roster length
            this.filtroTuttiGliEroi({className: "search_hero_filter", name: "", value: ""}); // aggiorna i filtri per evitare bug se l'opzione nascondi eroi già in team è attiva
            this.filtroTuttiGliEroi({className: "search_hero_filter", name: "", value: ""}, "MyHeroes"); // aggiorna i filtri per evitare bug se l'opzione nascondi eroi già in team è attiva
            this.updateUserData();
          },
          removeHero: function (hero) {
            //this.myHeroesList.splice(this.myHeroesList.indexOf(hero), 1);
            delete this.myHeroesList[hero];
            this.rosterLength -=1; // usa per indicare a vue che qualcosa è cambiato
            if (this.locked.includes(hero)) { // lock
               this.locked.splice(this.locked.indexOf(hero), 1)
            };
            for (var i = 0; i < this.cartesian_lock.length; i++) {
              this.removeCartesian_lock(i, hero);
            };
            this.filtroTuttiGliEroi({className: "search_hero_filter", name: "", value: ""}); // aggiorna i filtri per evitare bug se l'opzione nascondi eroi già in team è attiva
            this.displayMyHeroes.splice(this.displayMyHeroes.indexOf(hero), 1); // rimuovi dalla display list dei miei eroi se presente (sempre presente)
            this.updateUserData();
          },
          removeShownHeroes: function () {
            for (var i = 0; i < this.displayMyHeroes.length; i++) {
              delete this.myHeroesList[this.displayMyHeroes[i]];
              if (this.locked.includes(this.displayMyHeroes[i])) { // lock
                this.locked.splice(this.locked.indexOf(this.displayMyHeroes[i]), 1)
              };
            };
            this.rosterLength = Object.keys(this.myHeroesList).length; // Update roster length
            this.displayMyHeroes = [];
            this.filtroTuttiGliEroi({className: "search_hero_filter", name: "", value: ""}); // aggiorna i filtri per evitare bug se l'opzione nascondi eroi già in team è attiva
            this.updateUserData();
          },
          isInTeam: function(hero) {
            if (this.myHeroesList[hero])
              return true
            else 
              return false;
          },
          isLocked: function(hero) {
            if (this.locked.includes(hero))
              return true;
            else
              return false;
          },
          lockHero: function(hero) {
            if (!this.locked.includes(hero)) { // lock
              if (this.locked.length < 4) {
                this.locked.push(hero);
              } else {
                snackbarMessage(this.strings.cant_lock_more_heroes)
              }
            } else { // già locked -> sblocca
              this.locked.splice(this.locked.indexOf(hero), 1)
            };
          },
          writeSettings: function() {
            var settings = JSON.stringify({notification: riceviNotifiche, lingua: this.lingua, verticalToolbar: document.getElementById("toolbar_position").checked});
            localStorage.setItem('Settings', settings);
            userSettings = JSON.parse(settings);
          },
          alertUserAction: function (f) {
            let action, message;
            if (f === "addDisplayed") {
              if (this.displayList.length==0) return;
              message = this.strings.confirm_add_heroes.replace(/<N>/g, this.displayList.length);
            } else if (f === "removeDisplayed") {
              if (this.displayMyHeroes.length==0) return;
              message = this.strings.confirm_remove_heroes.replace(/<N>/g, this.displayMyHeroes.length);
            };
            var answer = window.confirm(message);
            if (answer) { // answer = true
              if (f === "addDisplayed") {
                this.addShownHeroes();
              } else if (f === "removeDisplayed") {
                this.removeShownHeroes();
              };
            }
            else { // cancel
            }
          },
          rightClickHero: function (key,e) { 
            e.preventDefault();
            setTimeout(() => {
              if (tastoDestro === 1) $("#debugHeroInfo").remove(), tastoDestro = 0;
              if (showValues) return debugRightMenu(e, key);
              var hero = this.thisHeroData(key);
              var self = this;
              /* E7DB language tags */
              var _lingua = "/"
              if (this.lingua === "kr") _lingua = "/ko/"
              else if (this.lingua === "jp") _lingua = "/jp/"
              else if (this.lingua === "cn") _lingua = "/cn/"
              else if (this.lingua === "zht") _lingua = "/tw/"
              else if (this.lingua === "fr") _lingua = "/fr/"
              else if (this.lingua === "pt") _lingua = "/pt/"
              else if (this.lingua === "es") _lingua = "/es/"
              else if (this.lingua === "th") _lingua = "/th/"
              else if (this.lingua === "de") _lingua = "/de/"
              var e7dbLink = "https://epicsevendb.com" + _lingua + "hero/"+ hero._id;

              tastoDestro = 1;

              let menuWidth = 400;
              let menuHeight = 480;
              let _app = document.getElementById("app");
              //let margin_bottom = parseInt( (_app.currentStyle?.marginTop || document.defaultView?.getComputedStyle(_app, '')?.getPropertyValue('margin-bottom') || 0 ), 10);
              let margin_bottom = !userSettings.verticalToolbar ? 0 : 70;
              
              
              //let margin_left = parseInt( (_app.currentStyle?.marginleft || document.defaultView?.getComputedStyle(_app, '')?.getPropertyValue('margin-left') || 0 ), 10);
              var clickCoordsX = getPosition(e).x;
              var clickCoordsY = getPosition(e).y;

              let windowWidth = window.innerWidth;
              let windowHeight = window.innerHeight;

              var transformX = 0;
              var transformY = 0;
              if ( (windowWidth - clickCoordsX - 5) < menuWidth ) {
                /*if (clickCoordsX - menuWidth > margin_left + 5)
                  transformX = 100;
                else*/
                  transformX =  Math.abs(Math.abs(clickCoordsX - windowWidth) - menuWidth) * 100 / menuWidth + 3;
              };

              if ( (windowHeight - e.clientY - margin_bottom - 5) < menuHeight ) {
                /*if ( e.clientY - menuHeight > margin_bottom && windowHeight - e.clientY > 0)
                  transformY = 100;
                else*/
                  transformY =  Math.abs(Math.abs(e.clientY - windowHeight) - menuHeight - margin_bottom) * 100 / menuHeight + 3;
              };

              /*console.log({windowWidth: windowWidth, windowHeight: windowHeight, clickCoordsX: clickCoordsX, clickCoordsY: clickCoordsY, transformX: transformX+"%", transformY: transformY+"%"})*/
              $( "#app" ).append(`
              <div id="debugHeroInfo" class="dropdown-content" style="z-index: 70; display: inline-block; max-height: 480px; top: `+ clickCoordsY +`px; left: `+clickCoordsX+`px; width: ` + menuWidth + `px; transform: translate(-`+transformX+`%, -`+transformY+`%); border-top: thick solid var(--icon-bar-active); box-sizing: border-box;">
                <span style="width: 100%; font-size: 24px; text-align: center;"><b>` + this.thisHeroTranslatedName(hero._id) + `</b><b class="close" style="float: right; cursor: pointer; font-size: 30px; margin-right: -10px;" onclick="$('#debugHeroInfo').remove()">x</b></span>
                <a href="` + e7dbLink + `" target="_blank">` + this.strings.view_on_e7db + `</a>
                <a href="https://e7herder.com/tools/model-viewer#type=5,id=` + hero.id + `" target="_blank">` + this.strings.view_hero_model + `</a>
                <span id="heroDetailsRight" style="width: 100% !important; padding: 0; overflow: scroll; position: relative; min-height: 50px;">
                  <i class="fa  fa-circle-notch fa-spin" style="font-size: 40px; position: absolute; top 40%; left: 40%;"></i>
                </span>
              </div>
              `);
              $.ajax({
                url: "https://api.epicsevendb.com/hero/" + hero._id + "?lang=" + this.lingua,
                type: 'GET',
                contentType: 'application/json',
                success: function (response) {
                  if (document.getElementById("debugHeroInfo") === null ) return; // right click has been removed
                  var skills = response.results[0].skills;

                  for (var i = 0; i<skills.length; i++) {
                    for (var j = 0; j < skills[i].values.length; j++) {
                      var number = skills[i].values[j] <= 1 ? Math.round( skills[i].values[j]*100 ) + "%" : skills[i].values[j];
                      if (skills[i].enhanced_description) {
                        skills[i].enhanced_description = skills[i].enhanced_description.replace(/{{variable}}/i,'<font color="orangered">' + number + '</font>');
                      } else {
                        skills[i].description = skills[i].description.replace(/{{variable}}/i,'<font color="orangered">' + number + '</font>');
                      };
                    };
                  };

                  document.getElementById("heroDetailsRight").innerHTML = "";

                  $( "#heroDetailsRight" ).append(
                    `<span onclick="var menu = this.parentNode.children[3].childNodes; menu[0].style.display = 'inline-block'; menu[1].style.display = 'none'; menu[2].style.display = 'none';" style="background-image: url(` + skills[0].assets.icon + `);" class="rightClickIconMenu"></span>` + 
                    `<span onclick="var menu = this.parentNode.children[3].childNodes; menu[0].style.display = 'none'; menu[1].style.display = 'inline-block'; menu[2].style.display = 'none';" style="background-image: url(` + skills[1].assets.icon + `);" class="rightClickIconMenu"></span>` + 
                    (skills[2] ? `<span onclick="var menu = this.parentNode.children[3].childNodes; menu[0].style.display = 'none'; menu[1].style.display = 'none'; menu[2].style.display = 'inline-block';" style="background-image: url(` + skills[2].assets.icon + `);" class="rightClickIconMenu"></span>` : "<span></span>") +
                    `<div style="padding: 0 16px 12px 16px; margin-top: -4px; background-color: var(--bg-color); max-height: 269px; overflow: scroll; overscroll-behavior: contain; box-sizing: border-box;">` +
                      `<div style="display: inline-block;"><p style="text-align: center"><b>` + skills[0].name + `</b></p><p>` + (skills[0].enhanced_description || skills[0].description) + `</p><p>` + (skills[0].soul_description ? "Soulburn:<br>" + skills[0].soul_description : "") + `</p></div>` +
                      `<div style="display: none;"><p style="text-align: center"><b>` + skills[1].name + `</b></p><p>` + (skills[1].enhanced_description || skills[1].description) + `</p><p>` + (skills[1].soul_description ? "Soulburn:<br>" + skills[1].soul_description : "") + `</p></div>` +
                      (skills[2] ? 
                          `<div style="display: none;"><p style="text-align: center"><b>` + skills[2].name + `</b></p><p>` + (skills[2].enhanced_description || skills[2].description) + `</p><p>` + (skills[2].soul_description ? "Soulburn:<br>" + skills[2].soul_description : "")
                           + `</p></div>` : "<div></div>"
                      ) +
                    `<p style="text-align: end; margin-bottom: 0;"><i>` + self.strings.skills_not_enhanced + `</i></p>
                    </div>`
                  );
                },
                error: function (err) {
                  console.log(err)
                  let error = "";
                  if (err.responseJSON) error = self.strings.e7api_missing_character; //"Couldn't find this character on EpicSevenDB";
                  else error = self.strings.e7api_couldnt_connect; //"Couldn't connect to EpicSevenDB.";
                  document.getElementById("heroDetailsRight").innerHTML = "";
                  document.getElementById("debugHeroInfo").style.borderColor = "red";
                  $( "#heroDetailsRight" ).append(
                    `<div style="padding: 12px 16px; margin-top: -4px; background-color: var(--bg-color)"><p style="text-align: center; border-color: red;">${error}</p></div>`
                  );
                }
              });
            }, 10);
          },
          menuLingua: function () {
            $( "#settings_window" ).append(`
              <div id="menu_lingua">
                <div class="modal" style="display:block;">
                  <form class="modal-content  modal-small modal-three-parts animate" id="menu_lingua">
                    <div>
                      <div class="modal-title">
                        ` + this.strings.language + `
                      </div>
                    </div>
                    <div>
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png" width="105" height="70" onclick="app.cambiaLingua('en')">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1200px-Flag_of_South_Korea.svg.png" width="105" height="70"  onclick="app.cambiaLingua('kr')">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1200px-Flag_of_the_People%27s_Republic_of_China.svg.png" width="105" height="70"  onclick="app.cambiaLingua('cn')">
                      <br><br>
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1200px-Flag_of_Japan.svg.png" width="105" height="70"  onclick="app.cambiaLingua('jp')">
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1200px-Flag_of_Italy.svg.png" width="105" height="70"  onclick="app.cambiaLingua('it')">
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png" width="105" height="70"  onclick="app.cambiaLingua('fr')">
                      <br><br>
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/1200px-Flag_of_Spain.svg.png" width="105" height="70"  onclick="app.cambiaLingua('es')">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/1280px-Flag_of_Portugal.svg.png" width="105" height="70"  onclick="app.cambiaLingua('pt')">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png" width="105" height="70"  onclick="app.cambiaLingua('de')">
                      <br><br>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Flag_of_the_Republic_of_China.svg/1000px-Flag_of_the_Republic_of_China.svg.png" width="105" height="70"  onclick="app.cambiaLingua('zht')">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg" width="105" height="70"  onclick="app.cambiaLingua('th')">
                    </div>
                    <div>
                      <button type="button" onclick="$('#menu_lingua').remove(); $('body').removeClass('modal-open')" class="modal-button">` + this.strings.back_btn + `</button>
                    </div>
                  </form>
                </div>
              </div>`
            );
            $("body").addClass("modal-open");
          },
          cambiaLingua: function (n) {
            if (n === this.lingua) {
               $('#menu_lingua').remove(); 
               $('body').removeClass('modal-open'); 
               return;
            }
            this.lingua = n;
            this.writeSettings();
            this.inizializzaione();
            this.impostaLingua();
            $('#menu_lingua').remove();
            $('body').removeClass('modal-open');
          },
          openCartesianLock: function (e) {
            this.isSelectingCartesian = e.toString();
            $("body").addClass("modal-open");
          },
          cartesianSlotRoster: function() {
            let tmp = [], n = this.isSelectingCartesian;
            for (var i in this.HeroDB) {
              //if (this.cartesian_lock.flat().includes(i) && !this.cartesian_lock[n].includes(i)) continue;
              if (this.myHeroesList[i]) tmp.push(i);
            };
            return tmp;
          },
          addToCartesianLock: function(e) {
            let n = this.isSelectingCartesian;
            this.cartesian_lock[n] = e;
            this.isSelectingCartesian = false;
            $("body").removeClass("modal-open");
          },
          removeCartesian_lock: function ( n, y) {
            if (this.cartesian_lock[n].includes(y))
              this.cartesian_lock[n].splice(this.cartesian_lock[n].indexOf(y), 1)
          },
          mostraSalvaRisultato: function (n) {
            $( "#calculate_window" ).append(`
              <div id="saveCamp" class="modal" style="display: block;">
                <form class="modal-content modal-small animate" id="saveCamp">
                  <div class="imgcontainer">
                    <p>` + this.strings.morale + `: ` + this.risultati[n].morale + `</p>
                    <img src="` + this.getHeroAssets(this.HeroDB[this.risultati[n].team[0]]._id).icon + `" onerror="this.src=app.getHeroAssets('` + this.HeroDB[this.risultati[n].team[0]]._id + `', 'onerror').icon;this.onerror=null;" style="height:55px;width:55px;">
                    <img src="` + this.getHeroAssets(this.HeroDB[this.risultati[n].team[1]]._id).icon + `" onerror="this.src=app.getHeroAssets('` + this.HeroDB[this.risultati[n].team[1]]._id + `', 'onerror').icon;this.onerror=null;" style="height:55px;width:55px;">
                    <img src="` + this.getHeroAssets(this.HeroDB[this.risultati[n].team[2]]._id).icon + `" onerror="this.src=app.getHeroAssets('` + this.HeroDB[this.risultati[n].team[2]]._id + `', 'onerror').icon;this.onerror=null;" style="height:55px;width:55px;">
                    <img src="` + this.getHeroAssets(this.HeroDB[this.risultati[n].team[3]]._id).icon + `" onerror="this.src=app.getHeroAssets('` + this.HeroDB[this.risultati[n].team[3]]._id + `', 'onerror').icon;this.onerror=null;" style="height:55px;width:55px;">
                    <p>` + 
                      this.thisHeroTranslatedName(this.thisHeroData(this.risultati[n].migliorPG1)._id) + `: `+ this.translateTopics(this.risultati[n].opzioneMigliore1) + `<br>` +
                      this.thisHeroTranslatedName(this.thisHeroData(this.risultati[n].migliorPG2)._id) + `: `+ this.translateTopics(this.risultati[n].opzioneMigliore2) +
                    `</p>
                  </div>
                  <div id="campSavingError" style="text-align:center;color:red;"></div>
                  <div class="container">
                    <form id="save_camp_details">
                      <label for="camp_name"><b>` + this.strings.camp_name_field + `</b></label>
                      <input type="text" style="width: 100%;" placeholder="` + this.strings.camp_name_placeholder + `" name="camp_name" id="camp_name" required="">
                      <div style="text-align: center;">
                        <input type="checkbox" id="checkbox_normal" name="raid_difficulty">
                        <label for="checkbox_normal">`+ this.strings.normal + `</label>
                        <input type="checkbox" id="checkbox_hell" name="raid_difficulty">
                        <label for="checkbox_hell">` + this.strings.hell +`</label>
                      </div>
                      <div style="text-align: center;">
                        <input type="checkbox" id="checkbox_queen" name="raid_boss" style="position:relative;top:0px;display:none">
                        <label for="checkbox_queen" class="label" style="position:relative;top:0px;"> <img src="https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2FQueen-Azumashik-284x300.png?v=1590932065337" style="position:relative;top:0px;height:60px;width:60px;" /><p style="position:relative;text-align:center;">` + this.strings.queen + `</p></label>
                        <input type="checkbox" id="checkbox_karkanis" name="raid_boss" style="position:relative;top:0px;display:none">
                        <label for="checkbox_karkanis" class="label" style="position:relative;top:0px;"> <img src="https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2FKarkanis-284x300.png?v=1590932065109" style="position:relative;top:0px;height:60px;width:60px;" /><p style="position:relative;text-align:center;">` + this.strings.karkanis + `</p></label>
                        <input type="checkbox" id="checkbox_juleeve" name="raid_boss" style="position:relative;top:0px;display:none">
                        <label for="checkbox_juleeve" class="label" style="position:relative;top:0px;"> <img src="https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2FJuleeve-284x300.png?v=1590932065054" style="position:relative;top:0px;height:60px;width:60px;" /><p style="position:relative;text-align:center;">` + this.strings.juleeve + `</p></label>
                        <input type="checkbox" id="checkbox_vera" name="raid_boss" style="position:relative;top:0px;display:none">
                        <label for="checkbox_vera" class="label" style="position:relative;top:0px;"> <img src="https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2FSecretary-Vera-284x300.png?v=1590932064989" style="position:relative;top:0px;height:60px;width:60px;" /><p style="position:relative;text-align:center;">` + this.strings.vera + `</p></label>
                        <input type="checkbox" id="checkbox_arakahan" name="raid_boss" style="position:relative;top:0px;display:none">
                        <label for="checkbox_arakahan" class="label" style="position:relative;top:0px;"> <img src="https://cdn.glitch.com/97cf5510-4561-4fba-a2bd-849e3aed02ba%2FDevourer-Arakahan-284x300.png?v=1590932064956" style="position:relative;top:0px;height:60px;width:60px;" /><p style="position:relative;text-align:center;">` + this.strings.arakahan + `</p></label>
                      </div>
                      <button type=submit onclick="return app.salvaRisultato(` + n + `)" class="modal-button">` + this.strings.save + `</button>
                      <button type=button onclick="$('#saveCamp').remove(); $('body').removeClass('modal-open')" class="modal-button">` + this.strings.canc_btn + `</button>
                    </form>
                  </div>
                </form>
              </div>
            `);
            $("body").addClass("modal-open");
            $('#camp_name').focus();
          },
          salvaRisultato: function (n) {
            try {
              var $form = $("#saveCamp");
              var campName = $('#camp_name', $form).val().replace(/  +/g,"").trim();
              if (campName && campName != "" && campName.indexOf("@_#") == -1) {
                if (!this.savedCamps[campName]) {
                  var normal = false;
                  var hell = false;
                  var queen = false;
                  var karkanis = false;
                  var juleeve = false;
                  var vera = false;
                  var arakahan = false;
                  if (document.getElementById("checkbox_normal").checked === true ) normal = true;
                  if (document.getElementById("checkbox_hell").checked === true ) hell = true;
                  if (document.getElementById("checkbox_queen").checked === true) queen = true;
                  if (document.getElementById("checkbox_karkanis").checked === true ) karkanis = true;
                  if (document.getElementById("checkbox_juleeve").checked === true ) juleeve = true;
                  if (document.getElementById("checkbox_vera").checked === true ) vera = true;
                  if (document.getElementById("checkbox_arakahan").checked === true ) arakahan = true;
                  var save = this.risultati.slice(n,n+1)[0];
                  save.normal = normal;
                  save.hell = hell;
                  save.queen = queen;
                  save.karkanis = karkanis;
                  save.juleeve = juleeve;
                  save.vera = vera;
                  save.arakahan = arakahan;

                  this.savedCamps[campName] = this.risultati[n];
                  var sendData = {morale: this.risultati[n].morale, team: this.risultati[n].team,  normal: normal, hell: hell, queen: queen, karkanis: karkanis, juleeve: juleeve, vera: vera, arakahan: arakahan};

                  $('#saveCamp').remove();
                  $('body').removeClass('modal-open');
                  localStorage.setItem('savedCamps', JSON.stringify(this.savedCamps) );
                  this.displaySavedCamps = Object.keys(this.savedCamps); // aggionra la lista da visulizzare
                  sendTeamUsageStatistics({function: "add", data: [sendData]}); // send team comp to server for stats
                  snackbarMessage(campName + ` ` + this.strings.saved_message)
                } else {
                  $("#campSavingError").text(this.strings.error_name_in_use);
                };
              } else if (campName.indexOf("@_#") != -1) {
                $("#campSavingError").text("The sequence @_# can't be used");  
              } else {
                $("#campSavingError").text(this.strings.error_no_name_provided);
              };
            } catch (err) {
              console.log(err)
            }; 
            return false;
          },
          eliminaRisultatoSalvato: function (campName) {
            try {
                campName = campName.replace(/@_#3#9#;/g,"'").replace(/@_#3#4#;/g,'"').replace(/@_#9#6#;/g,'`'); // avoid errors during deletion
                sendTeamUsageStatistics({function: "remove", data: [this.savedCamps[campName]]}); // send team comp to server for stats
                delete this.savedCamps[campName];
                $('#savedCamp').remove();
                $('body').removeClass('modal-open');
                localStorage.setItem('savedCamps', JSON.stringify(this.savedCamps) );
                this.displaySavedCamps = Object.keys(this.savedCamps); // aggionra la lista da visulizzare

                snackbarMessage(campName + ` ` + this.strings.deleted_message);
            } catch (err) {
              console.log("Error while removing camp")
            };
          },
          mostraRisultatoSalvato: function (campName) {
            for (var i in this.savedCamps[campName].team) {
              this.savedCamps[campName].team[i] = this.savedCamps[campName].team[i].toLowerCase().replace(/ /g,"-").replace(/&/g,"").replace(/'/g,"");
            };
            this.savedCamps[campName].migliorPG1 = this.savedCamps[campName].migliorPG1.toLowerCase().replace(/ /g,"-").replace(/&/g,"").replace(/'/g,"");
            this.savedCamps[campName].migliorPG2 = this.savedCamps[campName].migliorPG2.toLowerCase().replace(/ /g,"-").replace(/&/g,"").replace(/'/g,"");
            $( "#my_teams_window" ).append(`
              <div id="savedCamp" class="modal" style="display:block;">
                <form class="modal-content modal-small animate" id="savedCamp">
                  <div class="imgcontainer">
                    <span onclick="app.eliminaRisultatoSalvato('` + campName.replace(/'/g,"@_#3#9#;").replace(/"/g,'@_#3#4#;').replace(/`/g,'@_#9#6#;') + `')"><i class="fa fa-trash close" style="color: var(--font-color);"></i></span>
                    <p>` + this.strings.morale + `: ` + this.savedCamps[campName].morale + `</p>
                    <img src="`+ this.getHeroAssets(this.thisHeroData( this.savedCamps[campName].team[0] )._id).icon + `" onerror="this.src=app.getHeroAssets('` + this.thisHeroData( this.savedCamps[campName].team[0] )._id + `', 'onerror').icon;this.onerror=null" style="height:55px;width:55px;">
                    <img src="`+ this.getHeroAssets(this.thisHeroData( this.savedCamps[campName].team[1] )._id).icon + `" onerror="this.src=app.getHeroAssets('` + this.thisHeroData( this.savedCamps[campName].team[1] )._id + `', 'onerror').icon;this.onerror=null" style="height:55px;width:55px;">
                    <img src="`+ this.getHeroAssets(this.thisHeroData( this.savedCamps[campName].team[2] )._id).icon + `" onerror="this.src=app.getHeroAssets('` + this.thisHeroData( this.savedCamps[campName].team[2] )._id + `', 'onerror').icon;this.onerror=null" style="height:55px;width:55px;">
                    <img src="`+ this.getHeroAssets(this.thisHeroData( this.savedCamps[campName].team[3] )._id).icon + `" onerror="this.src=app.getHeroAssets('` + this.thisHeroData( this.savedCamps[campName].team[3] )._id + `', 'onerror').icon;this.onerror=null" style="height:55px;width:55px;">
                    <p>` + 
                      this.thisHeroTranslatedName(this.thisHeroData(this.savedCamps[campName].migliorPG1)._id) + `: `+ this.translateTopics(this.savedCamps[campName].opzioneMigliore1) + `<br>` +
                      this.thisHeroTranslatedName(this.thisHeroData(this.savedCamps[campName].migliorPG2)._id) + `: `+ this.translateTopics(this.savedCamps[campName].opzioneMigliore2) +
                    `</p>
                  </div>
                  <div class="container">
                    <button type="button" onclick="$('#savedCamp').remove(); $('body').removeClass('modal-open');" class="modal-button">` + this.strings.back_btn + `</button>
                  </div>
                </form>
              </div>
            `);
            $("body").addClass("modal-open");
          },
          modalGenerateURL: function (campName) {
            $( "#settings_window" ).append(`
              <div id="url_generator" class="modal" style="display:block;">
                <div class="modal-content modal-small animate">
                  <div class="imgcontainer">
                    <div id="url_container" class="box_advanced_settings" style="display: block; width:100%; max-height: 250px; padding: 20px;  position: relative; overflow-x: auto; font-size: 16px; word-break: break-all;background-color: rgb(0,0,0,0.4);box-sizing: border-box;">` + 
                      generateUrl(this.myHeroesList) + 
                   `</div>
                    <button type="button" onclick="copyText('url_container')" class="button_login">` + this.strings.copia + `</button>
                    <br>` + this.strings.url_usage_help + `<br><br>
                  </div>
                  <div class="container">
                    <button type="button" onclick="$('#url_generator').remove(); $('body').removeClass('modal-open');" class="modal-button" style="width:100%">` + this.strings.back_btn + `</button>
                  </div>
                </div>
              </div>
            `);
            $("body").addClass("modal-open");
          },
          getSavedTeamsStats: function() {
            self = this;
            var refreshButton = document.getElementById("refreshStats");
            refreshButton.style.display = "none";
            if (document.getElementById("stats_table")) $("#stats_table").remove();
            $.ajax({
              url: "https://ceciliabotgithub.glitch.me/team_statistics",
              type: 'GET',
              contentType: 'application/json',
              success: function (response) {
                var toPrint = "";
                var toPrintChar = "";
                var usiTop400 = 0;
                if (response.data.length>0) {
                  for (var i = 0; i < response.data.length; i++) {
                    if (self.HeroDB[response.data[i].team[0]]) {
                      usiTop400 += response.data[i].usi;
                      toPrint += "<tr>" +  
                          `<td style='padding-top: 15px; padding-bottom:10px'><img src="` + self.getHeroAssets(self.HeroDB[response.data[i].team[0]]._id).icon + `" onerror="this.onerror=null;this.src=app.getHeroAssets('` + self.HeroDB[response.data[i].team[0]]._id + `', 'onerror').icon;" style="height:55px;width:55px;"></td>` +
                          `<td style='padding-top: 15px; padding-bottom:10px'><img src="` + self.getHeroAssets(self.HeroDB[response.data[i].team[1]]._id).icon + `" onerror="this.onerror=null;this.src=app.getHeroAssets('` + self.HeroDB[response.data[i].team[1]]._id + `', 'onerror').icon;" style="height:55px;width:55px;"></td>` +
                          `<td style='padding-top: 15px; padding-bottom:10px'><img src="` + self.getHeroAssets(self.HeroDB[response.data[i].team[2]]._id).icon + `" onerror="this.onerror=null;this.src=app.getHeroAssets('` + self.HeroDB[response.data[i].team[2]]._id + `', 'onerror').icon;" style="height:55px;width:55px;"></td>` +
                          `<td style='padding-top: 15px; padding-bottom:10px'><img src="` + self.getHeroAssets(self.HeroDB[response.data[i].team[3]]._id).icon + `" onerror="this.onerror=null;this.src=app.getHeroAssets('` + self.HeroDB[response.data[i].team[3]]._id + `', 'onerror').icon;" style="height:55px;width:55px;"></td>` +
                          "<td style='width:50vw; padding-top: 15px; padding-bottom:10px'> <div class='histogram_bar' style='width:" + response.data[i].usi/response.totale*100 + "%;'><span>" + Math.round(( (response.data[i].usi/response.totale*100)+ Number.EPSILON) * 100) / 100 + " %</span></div></td>" +
                          "<td style='text-align: center; padding-top: 15px; padding-bottom:10px; border-right: thin;'>" + response.data[i].morale + "</td>" +
                          "<td style='text-align: center; padding-top: 15px; padding-bottom:10px'>" + response.data[i].usi + "</td></tr>";
                    };
                  };
                  for (var i = 0; i < response.characters.length; i++) {
                    if (self.HeroDB[response.characters[i].character]) {
                      toPrintChar += "<tr>" +  
                        `<td style='padding-top: 15px; padding-bottom:10px'><img src="` + self.getHeroAssets(self.HeroDB[response.characters[i].character]._id).icon + `" onerror="this.onerror=null;this.src=app.getHeroAssets('` + self.HeroDB[response.characters[i].character]._id + `', 'onerror').icon;" style="height:55px;width:55px;"></td>` +
                        "<td style='width: 80vw; padding-top: 15px; padding-bottom:10px'> <div class='histogram_bar' style='width:" + response.characters[i].usi/response.totale*100 + "%;'><span>" + Math.round((( response.characters[i].usi/response.totale*100)+ Number.EPSILON) * 100) / 100 + " %</span></div></td>" +
                        "<td></td>" +
                        "<td style='text-align: center; padding-top: 15px; padding-bottom:10px'>" + response.characters[i].usi +"</td></tr>";
                    };
                  };
                  if (usiTop400 < response.totale) {
                    toPrint += "<tr>" +
                      "<td colspan='4' style='text-align: center;'>" + self.strings.others + "</td>" +
                      "<td style='width:50vw; padding-top: 15px; padding-bottom:10px'> <div class='histogram_bar' style='width:" + (response.totale-usiTop400)/response.totale*100 + "%;'><span>" + Math.round(( ( (response.totale-usiTop400)/response.totale*100)+ Number.EPSILON) * 100) / 100 + " %</span></div></td>" +
                      "<td></td>" +
                      "<td style='text-align: center; padding-top: 15px; padding-bottom:10px'>" + (response.totale-usiTop400) + "</td></tr>";
                  };

                } else {
                  toPrint = "<td>No data</td>";
                  toPrintChar = "";
                };
                refreshButton.style.display = "";
                $('#char_tab_stats').removeClass('activetab');
                $('#team_tab_stats').addClass('activetab');
                $( "#saved_teams_stats").append(`<table id="stats_table" style="width: 100%; background-color: var(--bg-color-secondary); padding: 10px; border-radius: 0 0 12px 12px;"><tbody id="teams_stats_tbody">
                  <th colspan="4">${self.strings.team}</th>
                  <th></th>
                  <th style="white-space: nowrap;">${self.strings.morale}</th>
                  <th style="white-space: nowrap;">${self.strings.teams}</th>
                  ` + toPrint + `</tbody>
                  <tbody id="char_stats_tbody" style="display: none;">
                  <th></th>
                  <th></th>
                  <th style="width: 20px;"></th>
                  <th style="white-space: nowrap;">${self.strings.teams}</th>
                  ` + toPrintChar + `</tbody></table>`);
              },
              error: function(jqXHR, textStatus, errorThrown) {
                refreshButton.style.display = "";
                $( "#saved_teams_stats").append(`<table id="stats_table"><td style="text-align: center;">Error while retirving data.<br> Please retry.</td></table>`);
                snackbarMessage(`failed to retrive data`);
              }
            });
          },
          helpWindow: function (sezione, argomento) {
            var titolo, contenuto;
            switch (argomento) { //HTML code is allowed
              case 'add_heroes_help':
                titolo = self.strings.aggiungi;
                contenuto = self.strings.add_heroes_help;
                break;
              case 'manage_heroes_help':
                titolo =self.strings.manage_heroes;
                contenuto = self.strings.manage_heroes_help;
                break;
              case 'advanced_settings':
                titolo =self.strings.impostazioni_avanzate;
                contenuto = self.strings.advanced_settings_help;
                break;
              case 'multi-lock':
                titolo =self.strings.multilock;
                contenuto = self.strings.multilock_help;
                break;
              case 'results_help':
                titolo =self.strings.risultati;
                contenuto = self.strings.results_help;
                break;
              default:
                titolo = "";
                contenuto = "";
            };

            $( "#" + sezione).append(`
              <div id="help_menu" class="modal" style="display:block;">
                <form class="modal-content modal-small modal-three-parts animate" id="savedCamp">
                  <div>
                    <span class="modal-title">` + titolo + `
                    </span>
                  </div>
                  <div>
                    <div class="modal-text">` + contenuto + `
                    </div>
                  </div>
                  <div>
                    <button type="button" onclick="$('#help_menu').remove(); $('body').removeClass('modal-open');" class="modal-button">` + this.strings.back_btn + `</button>
                  </div>
                </form>
              </div>
            `);
            $("body").addClass("modal-open"); //prevent body from scrolling while modal is open
          },
          setDisplayStyle: function(layout, sezione) {
            var add_window = document.getElementById("pulsanti_display_add_window").getElementsByClassName("search_hero_filter");
            add_window[0].className = "search_hero_filter";
            add_window[1].className = "search_hero_filter";
            var manage_window = document.getElementById("pulsanti_display_manage_window").getElementsByClassName("search_hero_filter");
            manage_window[0].className = "search_hero_filter";
            manage_window[1].className = "search_hero_filter";
            if (layout.value == "grid") {
                add_window[0].className += " active";
                manage_window[0].className += " active";
            } else if (layout.value == "list") {
                add_window[1].className += " active";
                manage_window[1].className += " active";
            };
            this.displayStyle = layout.value;
          },
          sortDisplayedHeroesByName() { // on language change call this function to sort by hero name
            self=this;
            this.sortedHeroDB.sort(function (a,b) {return ((self.thisHeroTranslatedName(a) < self.thisHeroTranslatedName(b)) ? -1 : ((self.thisHeroTranslatedName(a) == self.thisHeroTranslatedName(b)) ? 0: 1))});
            this.filtroTuttiGliEroi({tipo:'refresh',casella:'',value:'',className: 'search_hero_filter', name: 'bodyLoad'},'AllHeroes');
            if (document.getElementById("myHeroes_sort_by").value=="name")
              this.displayMyHeroes.sort(function (a,b) {return ((self.thisHeroTranslatedName(a) < self.thisHeroTranslatedName(b)) ? -1 : ((self.thisHeroTranslatedName(a) == self.thisHeroTranslatedName(b)) ? 0: 1))});
          },
          sortHeroes: function (sortBy, a, b) {
            return this.thisHeroData(a)[sortBy] > this.thisHeroData(a)[sortBy] ? this.thisHeroData(a).name < this.thisHeroData(a).name : -1
          },
          filtroTuttiGliEroi: function (button, listToModify) {
            self = this;
            var tmpArray, pulsantiIn, filtro = {};
            if (listToModify === "AllHeroes" || listToModify == undefined)  { 
              tmpArray = this.sortedHeroDB.slice(); // slice per creare una copia e non modificare l'originale
              pulsantiIn = document.getElementById("add_window"); // determina in che sezione sono i pulsanti
              //if (button.className == "search_hero_filter") 
              filtro["ricerca"] = document.getElementById("inputInTuttiGliEroi").value; // ottieni il testo digitato nella casella
              var sortBy = document.getElementById("allHeroes_sort_by").value;
              if (sortBy != "date") tmpArray.sort((x, y) => { return (this.thisHeroData(x)[sortBy] > this.thisHeroData(y)[sortBy] ) - (this.thisHeroData(x)[sortBy] < this.thisHeroData(y)[sortBy] ) || (this.thisHeroData(x).name > this.thisHeroData(y).name ) - (this.thisHeroData(x).name < this.thisHeroData(y).name ) });
            } else if (listToModify === "MyHeroes")  {
              tmpArray = Object.keys(this.myHeroesList);
              var sortBy = document.getElementById("myHeroes_sort_by").value;
              if (sortBy != "date") tmpArray.sort((x, y) => { return (this.thisHeroData(x)[sortBy] > this.thisHeroData(y)[sortBy] ) - (this.thisHeroData(x)[sortBy] < this.thisHeroData(y)[sortBy] ) || (this.thisHeroData(x).name > this.thisHeroData(y).name ) - (this.thisHeroData(x).name < this.thisHeroData(y).name ) });
              filtro["ricerca"] =  document.getElementById("inputInMyHeroes").value; // ottieni il testo digitato nella casella
              pulsantiIn = document.getElementById("manage_window"); // determina in che sezione sono i pulsanti
            };
            if (filtro.ricerca == undefined) filtro.ricerca = "";
            var pulsanti = pulsantiIn.getElementsByClassName(button.className);
            for (var i = 0; i < pulsanti.length; i++) {
              if (pulsanti[i].className.indexOf("active") != -1) {
                filtro[pulsanti[i].name] = pulsanti[i].value;
                if (pulsanti[i].name == button.name) pulsanti[i].className = button.className; // rimuove la class "active"
              };
            };
            button.className = button.className.replace(/active/gi,"");
            button.className += " active"; // attiva questo pulsante
            filtro[button.name] = button.value; // attualizza il filtro
            //imposta la nuova array da visualizzare
            for (var i = 0; i < tmpArray.length;i++) {
              if ((this.HeroDB[tmpArray[i]].role != filtro.filter_class && filtro.filter_class != "*") || 
                  (this.HeroDB[tmpArray[i]].attribute != filtro.filter_element && filtro.filter_element != "*") || 
                  (this.HeroDB[tmpArray[i]].rarity != filtro.filter_rarity && filtro.filter_rarity != "*") ||
                  (filtro.filter_gia_aggiunti == "true" && this.myHeroesList[tmpArray[i]] ) ||
                  (this.thisHeroTranslatedName(this.thisHeroData(tmpArray[i])._id).toLowerCase().indexOf(filtro.ricerca.toLowerCase()) === -1 && this.thisHeroData(tmpArray[i]).name.toLowerCase().indexOf(filtro.ricerca.toLowerCase()) === -1)
              ) {
                 tmpArray.splice(tmpArray.indexOf(tmpArray[i]), 1);
                 i--
              };
            };
            if (listToModify === "AllHeroes" || listToModify == undefined)  { 
                this.displayList = tmpArray;
                //tmpArray.length = 0;
            } else if (listToModify === "MyHeroes")  { 
                if (filtro["filter_locked_only"] == "true") tmpArray = this.locked;
                this.displayMyHeroes = tmpArray;
                //tmpArray.length = 0;
            };
          },
          personalizzaRisultati: function () {
            var risultati = { numeroMassimo: true, n: 200, noImmagini: false, minMorale: false, morale: 0, lockedMatter: false }
            checkNumeroMassimo = document.getElementById("numeroRisultatiMassimo");
            valoreRisultatiMassimo = document.getElementById("n_risultati");
            checkMoraleMinimo = document.getElementById("moraleMinimo");
            valoreMoraleMinimo = document.getElementById("n_moraleMinimo");
            //checkImmagini = document.getElementById("disattivaImmaingiRisultati");
            if (checkNumeroMassimo.checked) {
              risultati.numeroMassimo = true;
              valoreRisultatiMassimo.disabled = false;
            } else {
              risultati.numeroMassimo = false;
              valoreRisultatiMassimo.disabled = true;
            };
            if (checkMoraleMinimo.checked) {
              risultati.minMorale = true;
              valoreMoraleMinimo.disabled = false;
            } else {
              risultati.minMorale = false;
              valoreMoraleMinimo.disabled = true;
            };
            if (document.getElementById("includi_locked_in_advanced_settings").checked) risultati.lockedMatter = true;
            //if (checkImmagini.checked) {
            //  risultati.noImmagini = true;
            //};
            if (!isNaN(parseInt(valoreRisultatiMassimo.value)) && parseInt(valoreRisultatiMassimo.value) > 0 ) {
              risultati.n = parseInt(valoreRisultatiMassimo.value)
              if (parseInt(valoreRisultatiMassimo.value) > 10000) {
                risultati.n = 10000;
                valoreRisultatiMassimo.value = 10000;
              }
            } else {
              risultati.n = 200
            };

            if (!isNaN(parseInt(valoreMoraleMinimo.value)) && parseInt(valoreMoraleMinimo.value) <= 52 ) {
              risultati.morale = parseInt(valoreMoraleMinimo.value)
            } else {
              risultati.morale = 0
            };
            if (risultati.numeroMassimo === false && risultati.minMorale === false) {risultati.numeroMassimo = true; risultati.n = 200;}
            if (risultati.numeroMassimo === false && risultati.minMorale === true) {risultati.numeroMassimo = true; risultati.n = 200;} // force a limit of 200 if only min morale is checked to avoid large memory usage
            this.customizedResuts = risultati;
          },
          editClassQuantity: function (e) {
            var target = e.parentNode, _classe = e.parentNode.attributes.value.value, n = 0;
            if (e.className === "incrementa"){
              if (this.classe.length > 3) return snackbarMessage(this.strings["team_size_exceeded"]);
              this.classe.push(_classe);
            } else if (e.className === "decrementa") {
              if (this.classe.indexOf(_classe) === -1) return
              this.classe.splice(this.classe.indexOf(_classe), 1);
            }

            for (var i = 0; i < this.classe.length; i++)
              if (this.classe[i] === _classe ) n++;

            target.firstElementChild.innerHTML = n;
            if (n===0) target.firstElementChild.style.display = "none"
            else target.firstElementChild.style.display = ""
          },
          aggiornaImposatazioniAvanzate: function () {
                //this.classe = [];
                this.elemento = [];
                this.debuffs = [];
                this.buffs = [];

                //Raccogli le impostazioni avanzate
                //var classi = document.getElementsByName("classe");
                var elemento_checkbox = document.getElementsByName("elemento");
                var debuffs_checkbox = document.getElementsByName("debuff");
                var buffs_checkbox = document.getElementsByName("buff");
                //for(var i = 0; i < classi.length; i++)  
                //{  
                //    if (classi[i].checked) this.classe.push(classi[i].value);
                //}; 
                for(var i = 0; i < elemento_checkbox.length; i++)  
                {  
                    if (elemento_checkbox[i].checked) this.elemento.push(elemento_checkbox[i].value);
                }; 
                for(var i = 0; i < debuffs_checkbox.length; i++)  
                {  
                    if (debuffs_checkbox[i].checked) this.debuffs.push(parseInt(debuffs_checkbox[i].value));
                }; 
                for(var i = 0; i < buffs_checkbox.length; i++)  
                {  
                    if (buffs_checkbox[i].checked) this.buffs.push(parseInt(buffs_checkbox[i].value));
                }; 

                if ($('#AoE').is(":checked"))
                {
                    this.AoE = true;
                } else this.AoE = false;

                if ($('#noS1debuffs').is(":checked"))
                {
                    this.noS1debuffs = true;
                } else this.noS1debuffs = false;

                if ($('#noDebuffs').is(":checked"))
                {
                    this.noDebuffs = true;
                } else this.noDebuffs = false;

                if (document.getElementById("mustIncludeDispel").checked)
                {
                  this.mustIncludeDispel = true;
                } else this.mustIncludeDispel = false;
            },
            impostaLingua: function () {
              var lingua = JSON.parse(localStorage.getItem('Settings') ? localStorage.getItem('Settings') : '{"lingua":"*"}').lingua;
              if (lingua == undefined) lingua = "*";
              try {
                if (lingua === "*") { // detect browser language
                  switch ( (navigator.language || navigator.userLanguage).split("-")[0] ) { // check browser setting and select language
                    case 'it':
                      lingua = "it";
                      break;
                    case 'fr':
                      lingua = "fr";
                      break;
                    case 'de':
                      lingua = "de";
                      break;
                    case 'pt':
                      lingua = "pt";
                      break;
                    case 'es':
                      lingua = "es";
                      break;
                    case 'ja':
                      lingua = "jp";
                      break;
                    case 'ko':
                      lingua = "kr";
                      break;
                    case 'th':
                      lingua = "th";
                      break;
                    case 'zh':
                      var langCode = navigator.language || navigator.userLanguage;
                      if (langCode === "zh-TW" || langCode === "zh-HK" || langCode === "zh-MO") lingua = "zht"
                      else lingua = "cn";
                      break;
                    default:
                      lingua = "en";
                  };
                };
              } catch (err) {
                lingua = "en"
              };
              this.lingua = lingua;
              
              //change titile and meta info
              if (this.lingua == "zht") {
                document.title = "第七史詩 露營模擬器";
                document.getElementsByTagName('meta')["keywords"].content = "第七史詩露營， 第七史詩露營模擬器，e7露營模擬器，第七史詩迷宮心情計算，第七史詩迷宮，e7迷宮心情計算";
                document.getElementsByTagName('meta')["description"].content = "第七史詩迷宮心情計算器，添加你的英雄算出符合你需求的最佳隊伍組合！";
              } else if (this.lingua == "cn") {
                document.title = "第七史诗 露营模拟器";
                document.getElementsByTagName('meta')["keywords"].content = "第七史诗露营， 第七史诗露营模拟器，e7露营模拟器，第七史诗迷宫心情计算，第七史诗迷宫，e7迷宫心情计算";
                document.getElementsByTagName('meta')["description"].content = "第七史诗迷宫心情计算器，添加你的英雄算出符合你需求的最佳队伍组合！";
              } else if (this.lingua == "fr") {
                document.title = "Simulateur de Camp E7";
                document.getElementsByTagName('meta')["keywords"].content = "camping epic seven, simulateur de camping epic 7, simulateur de camp e7, calculateur de moral epic 7, raid e7, raid epic seven";
                document.getElementsByTagName('meta')["description"].content = "Calculateur de moral E7. Ajoutez votre héros pour trouver la meilleure combinaison d'équipe avec un moral élevé!";
              } else {
                document.title = "E7 Camp Simulator";
                document.getElementsByTagName('meta')["keywords"].content = "epic seven camping, epic 7 camping simulator, e7 camp simulator, epic 7 morale calculator, e7 raid, epic seven raid";
                document.getElementsByTagName('meta')["description"].content = "Epic Seven Camping Simulator for Raid and Labyrinth. Add your roster to find the best team combination with high morale!";
              };

              if (this.lingua == "it") {
                this.strings = {
                  welcome: "Benvenuto",
                  whats_new: "Novità",
                  instructions: "Istruzioni",
                  websites: "Pagine",
                  credits: "Credits",
                  messaggio_di_benvenuto: "Benvenuto su Epic Seven Camp simulator",
                  data_by: "Data by EpicSevenDB",
                  all: "All",
                  sort: "Ordina",
                  filter: "Filtro",
                  modified: "Modifica",
                  name: "Nome",
                  ingame_id: "ID gioco",
                  remove_displayed_heroes: "Rimuovi questi eroi",
                  add_displayed_heroes: "Aggiungi questi eroi",
                  confirm_remove_heroes: "Sei sicuro di voler rimuovere <N> eroi dalla tua lista?",
                  confirm_add_heroes: "Sei sicuro di voler aggiungere <N> eroi dalla tua lista?",
                  aggiungi: "Aggiungi eroe",
                  i_tuoi_eroi: "I tuoi eroi",
                  search: "Cerca",
                  cant_lock_more_heroes: "Hai già 4 eroi in squadra",
                  impostazioni_avanzate: "Impostazioni Avanzate",
                  warn_tsize_adv_title: "Hai un sacco di eroi e nessun eroe bloccato",
                  warn_tsize_adv_details: "Attivando le impostazioni avanzate aumenterà il tempo richiesto per il calcolo delle combinazioni. \nPuoi ridurre il tempo richiesto per il calcolo bloccando un personaggio.",
                  numero_massimo_risultati: "Numero massimo di risultati (max 10.000)",
                  morale_minimo_risultati: "Morale minimo",
                  includi_locked_in_adv: "Gli eroi bloccati contano al fine del raggiungimento delle condizioni avanzate",
                  disabilita_immagini_in_risultati: "Disabilita avatar dei personaggi nei risultati (consigliato se si richiedono tanti risultati)",
                  deve_contenere_AoE: "Team deve contenere AoE",
                  no_s1_debuffs: "No S1 Debuffs (Esclusi: Provoke, Sleep, Stun e Poison)",
                  no_debuffs: "No Debuffs (Esclusi: Provoke, Sleep, Stun e Poison)",
                  must_include_dispel: "Team deve contenere dispel (Rimuovi o riduci la durata dei buff dal nemico)",
                  classe: "Classe",
                  attribute: "Attributo",
                  rarity: "Rarità",
                  knight: "Knight",
                  warrior: "Warrior",
                  thief: "Thief",
                  ranger: "Ranger",
                  mage: "Mage",
                  "soul-weaver": "Soul Weaver",
                  fire: "Fire",
                  ice: "Ice",
                  earth: "Earth",
                  light: "Light",
                  dark: "Dark",
                  elemento: "Elemento",
                  buff: "Buff",
                  debuff: "Debuff",
                  combinations: "Combinazioni possibili",
                  multilock: "Multi-lock (Cartesian Product)",
                  multilock_slot: "Slot",
                  add_to_slot: "Aggiungi a questo slot",
                  add_selection: "Aggiungi selezionati",
                  seleziona: "Seleziona",
                  deselect_all : "Deseleziona tutto",
                  possibili_combinazioni: "Combinazioni:",

                  //Help window
                  add_heroes_help: "Tap or click the portrait of a hero to add that hero to your roster.<br>\
                            Heroes in your roster will be used to calculate all possible combinations and return the best 200 combinations.<br>\
                            You can add as many heroes as you wish but the time needed to calculate all possible combinations will also increase.<br>\
                            Your roster will be saved and can be used everytime you visit this page without the need to add each hero everytime!<br>\
                            <br>\
                            If you are using the \"List\" display mode tap the \"+\" symbol to add a hero to your roster",
                  manage_heroes:"Manage Heroes",
                  manage_heroes_help:"In this window you can view all the heroes currently in your roster.<br>\
                            You can remove a hero by clicking the \"x\" at the bottom of the hero's portrait.<br>\
                            You can lock a hero by clicking he's portrait, a lock symbol will appear near the portrait. A locked hero will appear in every team in the results page.<br>\
                            You can calculate all the camping results for the current roster by clicking the bonfire icon in the toolbar or click the book icon to add advance settings.",                    
                  advanced_settings_help:"Here you can costumize your camp results.<br>\
                            <b style=\"color:red\">Locked heroes are not subject to these restrictions</b><br><br>\
                            You can select as many as you want but keep in mind time size while doing so.<br>\
                            For example if you lock 5 classes or 5 elements you will get a team size error.<br>\
                            Because locked heroes ignore advanced settings if you lock \"Tamarinne\" and select Soul weaver as a class you will get \"Tamarinne\" + another Soul weaver in every team. The same thing applies to Buffs and Debuffs<br>",
                  multilock_help:"Each slot is a space in your team, on each slot you can add as many heroes as you wish.<br>\
                            Only one of the Heroes locked for each slot will be in the results. The same hero can't be added on multiple slots.<br>\
                            Empty slots will be filled with the remaining heroes in your roster.<br>\
                            If you use all your heroes to fill 3 or less slots and no heroes are left to fill the remaining slots you will get a \"not enough heroes left\" error.<br>\
                            Slots that are left empty will be subject of restrictions from advanced settings.<br><br>\
                            Locked heroes in one of the slots will ignore advanced settings.<br>\
                            If you fill all the slots and select any advanced settings you will get a \"team size exceeded\" error or 0 results.<br>\
                            This option is useful to create costum rules, for example you can put all your knights in 1 slot and you will get a knight for each team in the results!",
                  results_help : "Here are displayed the best 200 combinations for your roster and current advanced settings.<br>\
                            You need at least 4 heroes in your current roster for any result to be displayed.<br>\
                            You can click the floppy disk icon to save a specific team composition (you will be prompted to input a name for that team), your saved teams will be displayed in the settings window.",

                  //Results window
                  risultati: "Risultati",
                  morale: "Morale",
                  team: "Team",
                  topics: "Topics",
                  abort_calculation: "Annulla operazione",
                  confirm_worker_termination: "Sei sicuro di voler annullare l'operazione?",
                  notification_title: "E7 Camp Simulator",
                  notification_ready: "I tuoi team sono pronti!",
                  results_error: "Errore",
                  team_size_exceeded: "Dimensione team superata!",
                  not_enough_heroes: "Nessun eroe rimanente da inserire nei rimanenti slot!",
                  locked_sc_normal_err: "Bloccati SC e eroe normale",

                  ///Result saving window:
                  camp_name_field: "Nome camp",
                  camp_name_placeholder: "Inserisci il nome del tuo camp",
                  normal: "Normale",
                  hell: "Hell",
                  queen: "Queen",
                  arakahan: "Arakahan",
                  karkanis: "Karkanis",
                  vera: "Vera",
                  juleeve: "Juleeve",
                  error_no_name_provided: "Nome richiesto!",
                  error_name_in_use: "Stai già utilizzando questo nome!",
                  saved_message: "salvato con successo!",
                  deleted_message: "eliminato!",

                  impostazioni: "Impostazioni",
                  my_teams: "Le mie squadre",
                  most_saved_teams: "Squadre più popolari",
                  refresh_team_stats: "Aggiorna",
                  heroes: "Eroi",
                  teams: "Squadre",
                  extras_map: "Miglior percorso",
                  raid: "RAID",
                  nixied: "Nixied",
                  nixiedinfo: "Nixied's maps by game8. They have a full guide here: ",

                  //Right click menu
                  view_on_e7db: "Visualizza dettagli eroe su EpicSevenDB.com",
                  view_hero_model: "Visualizza modello 2D su e7herder.com",
                  skills_not_enhanced: "Skills are awakened but not enhanced",
                  e7api_missing_character: "Questo eroe non è presente nel database di EpicSevenDB",
                  e7api_couldnt_connect: "Impossibile connettersi a EpicSevenDB",

                  tema_notturno: "Tema notturno",
                  vert_iconbar: "Toolbar verticale",
                  notifiche: "Notifiche",
                  debug_camping_values: "Debug: Mostra i valori delle opzioni",
                  hero_name_under_pic_grid: "Mostra il nome eroe sotto l'immagine",
                  genera_url: "Genera URL",
                  url_usage_help: "Copia e incolla questo URL nel browser o dispositivo desiderato per generare una copia dei tuoi eroi attuali.",
                  copia: "Copia",
                  save: "Salva",
                  confirm: "Conferma",
                  selected: "Selezionati",
                  canc_btn: "Annulla",
                  back_btn: "Indietro",
                  others: "Altri",
                  language: "Lingua"
                };
              } else if (this.lingua == "cn") {
                this.strings = {
                  welcome: "欢迎",
                  whats_new: "更新日志",
                  instructions: "简明教程",
                  websites: "实用链接",
                  credits: "作者",
                  messaggio_di_benvenuto: "欢迎使用第七史诗露营模拟器",
                  data_by: "数据来源 EpicSevenDB",
                  all: "全部",
                  sort: "排序",
                  filter: "Filter",
                  modified: "按添加日期",
                  name: "按英雄名称",
                  ingame_id: "按英雄ID",
                  remove_displayed_heroes: "移除下方显示的英雄",
                  add_displayed_heroes: "添加下方显示的英雄",
                  confirm_remove_heroes: "你确定要从你的英雄列表里删除以下 <N> 个英雄?", // <N> is replaced by the number of heroes
                  confirm_add_heroes: "你确定要往你的英雄列表里添加以下 <N> 个英雄?", // <N> is replaced by the number of heroes
                  aggiungi: "添加英雄 ",
                  i_tuoi_eroi: "我的英雄",
                  cant_lock_more_heroes: "不能锁定超过4个英雄",
                  search: "搜索",
                  impostazioni_avanzate: "高级设置",
                  warn_tsize_adv_title: "你有大量的英雄并且没有锁定任何英雄，计算可能耗费较长时间",
                  warn_tsize_adv_details: "使用高级设定会耗费更多时间计算. \n你可以通过锁定英雄来提高计算速度.",
                  numero_massimo_risultati: "显示结果数量 (MAX 10.000)",
                  morale_minimo_risultati: "最低心情限制",
                  includi_locked_in_adv: "高级设置包括锁定的英雄",
                  disabilita_immagini_in_risultati: "结果页不显示英雄头像 (如果你设定的显示结果数量非常大，关闭英雄头像显示有助于提升性能)",
                  deve_contenere_AoE: "队伍必须包含 AoE",
                  no_s1_debuffs: "S1不带Debuff (挑衅, 睡眠, 晕眩 和中毒除外)",
                  no_debuffs: "技能不带Debuff (挑衅, 睡眠, 晕眩 和中毒除外)",
                  must_include_dispel: "队伍必须包含驱散角色",
                  classe: "职业",
                  attribute: "Attribute",
                  rarity: "Rarity",
                  knight: "骑士",
                  warrior: "战士",
                  thief: "盗贼",
                  ranger: "射手",
                  mage: "魔导士",
                  "soul-weaver": "精灵师",
                  fire: "火焰属性",
                  ice: "寒气属性",
                  earth: "自然属性",
                  light: "光明属性",
                  dark: "黑暗属性",
                  elemento: "属性",
                  buff: "Buff",
                  debuff: "Debuff",
                  combinations: "可能的组合",
                  multilock: "锁定多人 (笛卡尔乘积)",
                  multilock_slot: "栏位",
                  add_to_slot: "添加到这个位置",
                  add_selection: "添加",
                  seleziona: "选择",
                  deselect_all : "全部取消选中",
                  possibili_combinazioni: "可能的组合:",

                  //Help window
                  add_heroes_help: "点击英雄头像将英雄添加到你的英雄列表.<br>\
                            你的英雄列表里的所有英雄将会用于计算可能的排列组合并给出心情最高的前200个结果.<br>\
                            可添加的英雄没有数量限制，添加英雄越多计算越慢.<br>\
                            你的英雄将会自动保存，不需要每次打开页面都重新选择，但是清除页面Cookie将会丢失你保存的设置和英雄列表!<br>\
                            如果你使用的是\"列表\"视图(可在搜索框右方切换) 点击\"+\" 号添加英雄至你的英雄列表<br>",
                  manage_heroes:"英雄列表管理",
                  manage_heroes_help:"在这个界面你可以查看所有保存的英雄.<br>\
                            点击英雄头像上的 \"x\" 就可以删除英雄.<br>\
                            点击英雄头像可以锁定英雄，被锁定的英雄将会出现在所有的计算结果中.<br>\
                            你可以点击工具栏的篝火图标计算露营心情，或者点击记事本图标添加高级选项.<br>",                    
                  advanced_settings_help:"这里可以进行高级设置.<br>\
                            <b style=\"color:red\">被锁定的英雄不受高级设置影响</b><br><br>\
                            你可以选择任意数量的选项，但是某些选项有特殊的限制.<br>\
                            例如你在职业一栏勾选超过4个职业就会报错，因为一个队伍最多不超过4个人.<br>\
                            因为被锁定的英雄无视高级设置限制，所以如果你锁定了 \"塔瑪林爾(偶像)\" 然后在高级设置的职业一栏选中了精灵师，那么在计算结果中 除了偶像还会再添加一个精灵师. 对于Buff和Debuff也是同理<br>",
                  multilock_help:"每个栏位代表队伍里的一个位置, 每个栏位可以添加任意数量的英雄.<br>\
                            计算结果中的每一个位置，只会出现对应栏位中的英雄. 同一个英雄不能被添加到多个栏位中.<br>\
                            空白的栏位对应你的英雄列表中剩余的全部英雄.<br>\
                            如果你将所有的英雄加到前三个栏位中将会出现 \"所有英雄添加完毕，已无英雄可添加至下一个栏位!\" 的错误信息.<br>\
                            空白的栏位将会受到高级设置的影响.<br><br>\
                            每个栏位中被锁定的英雄将无视高级设置的影响.<br>\
                            如果你所有栏位都放入了英雄，同时又选择了任意一个高级设置， 将会报错 \"队伍人数超过上限!\" 并返回 0 个计算结果.<br>\
                            这个选项有助于创建自定义队伍, 比如你将你所有的骑士放在一个栏位中，那么你所有的计算结果里就必定会出现一个骑士!<br>",
                  results_help : "这里会出现根据你的设置筛选出的心情最高的前200个结果.<br>\
                             你的英雄列表里至少要有4个英雄才能显示结果.<br>\
                             你可以点击每个结果前面的图标保存对应的队伍 (会弹出一个窗口要求你自定义队伍名称), 你保存的队伍会出现在右下方齿轮图标的\"设置\"一栏里.<br>",

                  //Results window
                  risultati: "计算结果",
                  morale: "心情",
                  team: "队伍",
                  topics: "对话",
                  abort_calculation: "中止计算",
                  confirm_worker_termination: "您确定要中止这次计算?",
                  notification_title: "E7 露营模拟器",
                  notification_ready: "结果计算完毕!",
                  results_error: "错误",
                  team_size_exceeded: "队伍人数超过上限!",
                  not_enough_heroes: "所有英雄添加完毕，已无英雄可添加至下一个栏位!",
                  locked_sc_normal_err: "转职英雄和转职前英雄不能同时出现在一个队伍!",

                  ///Result saving window:
                  camp_name_field: "队伍名称",
                  camp_name_placeholder: "你的队伍名称",
                  normal: "普通",
                  hell: "地狱",
                  queen: "阿吉曼夏洛斯女王",
                  arakahan: "捕食者阿拉哈坎",
                  karkanis: "执行者卡尔卡努斯",
                  vera: "侍从官培拉",
                  juleeve: "乔里夫议会",
                  error_no_name_provided: "队伍名称不能为空!",
                  error_name_in_use: "该名称已经被使用!",
                  saved_message: "保存成功!",
                  deleted_message: "删除成功!",

                  impostazioni: "设置",
                  my_teams: "我的队伍",
                  most_saved_teams: "常用队伍&英雄",
                  refresh_team_stats: "刷新",
                  heroes: "英雄",
                  teams: "队伍",
                  extras_map: "迷宫最佳路线",
                  raid: "逆袭迷宫",
                  nixied: "尼克斯特的圣所",
                  nixiedinfo: "尼克斯特的圣所地图 by game8. 点击查看详细说明: ",

                  //Right click menu
                  view_on_e7db: " 前往EpicSevenDB.com查看英雄详细信息",
                  view_hero_model: "前往e7herder.com查看英雄模型",
                  skills_not_enhanced: "技能已经觉醒但是并没有强化",
                  e7api_missing_character: "在 EpicSevenDB 暂时找不到该英雄的信息",
                  e7api_couldnt_connect: "无法连接到 EpicSevenDB",

                  tema_notturno: "夜间模式",
                  vert_iconbar: "垂直工具栏",
                  notifiche: "启用通知",
                  debug_camping_values: "调试: 显示所有对话心情值",
                  hero_name_under_pic_grid: "在英雄头像下方显示英雄名字",
                  genera_url: "生成URL链接",
                  url_usage_help: "复制这个链接到新设备来导入你的英雄列表. <br>设备间并不会自动同步, 如果你修改了英雄列表，下次导入前需要重新生成URL链接.",
                  copia: "复制",
                  save: "保存",
                  confirm: "Confirm",
                  canc_btn: "取消",
                  back_btn: "返回",
                  selected: "Selected",
                  others: "其它",
                  language: "语言"
                };
              } else if (this.lingua == "zht") {
                this.strings = {
                  welcome: "歡迎",
                  whats_new: "更新日誌",
                  instructions: "簡明教程",
                  websites: "實用鏈接",
                  credits: "作者",
                  messaggio_di_benvenuto: "歡迎使用第七史詩露營模擬器",
                  data_by: "數據來源 EpicSevenDB",
                  all: "全部",
                  sort: "排序",
                  filter: "Filter",
                  modified: "按添加日期",
                  name: "按英雄名稱",
                  ingame_id: "按英雄ID",
                  remove_displayed_heroes: "移除下方顯示的英雄",
                  add_displayed_heroes: "添加下方顯示的英雄",
                  confirm_remove_heroes: "你確定要從你的英雄列表裏刪除以下 <N> 個英雄?", // <N> is replaced by the number of heroes
                  confirm_add_heroes: "你確定要往你的英雄列表裏添加以下 <N> 個英雄?", // <N> is replaced by the number of heroes
                  aggiungi: "添加英雄 ",
                  i_tuoi_eroi: "我的英雄",
                  cant_lock_more_heroes: "不能鎖定超過4個英雄！",
                  search: "搜索",
                  impostazioni_avanzate: "高級設定",
                  warn_tsize_adv_title: "你有大量的英雄並且冇有鎖定任何英雄，計算可能耗費較長時間",
                  warn_tsize_adv_details: "使用高級設定會耗費更多時間計算. \n你可以通過鎖定英雄來提高計算速度.",
                  numero_massimo_risultati: "顯示結果數量 (MAX 10.000)",
                  morale_minimo_risultati: "最低心情限制",
                  includi_locked_in_adv: "高級設置包括鎖定的英雄",
                  disabilita_immagini_in_risultati: "結果頁不顯示英雄頭像 (如果你設定的顯示結果數量非常大，關閉英雄頭像顯示有助於提升性能)",
                  deve_contenere_AoE: "隊伍必須包含 AoE",
                  no_s1_debuffs: "S1不帶Debuff (挑釁, 睡眠，暈眩 和中毒除外)",
                  no_debuffs: "技能不帶Debuff (挑釁, 睡眠，暈眩 和中毒除外)",
                  must_include_dispel: "隊伍必須包含驅散角色",
                  classe: "職階",
                  attribute: "Attribute",
                  rarity: "Rarity",
                  knight: "騎士",
                  warrior: "戰士",
                  thief: "盜賊",
                  ranger: "射手",
                  mage: "魔導士",
                  "soul-weaver": "精靈師",
                  fire: "火焰屬性",
                  ice: "寒氣屬性",
                  earth: "自然屬性",
                  light: "光明屬性",
                  dark: "黑暗屬性",
                  elemento: "屬性",
                  buff: "Buff",
                  debuff: "Debuff",
                  combinations: "可能的組合",
                  multilock: "鎖定多人 (笛卡兒積)",
                  multilock_slot: "欄位",
                  add_to_slot: "添加到這個位置",
                  add_selection: "添加",
                  seleziona: "選擇",
                  deselect_all : "全部取消選中",
                  possibili_combinazioni: "可能的組合:",
                  
                  //Help window
                  add_heroes_help: "點選英雄頭像將英雄添加到你的英雄列表.<br>\
                            你的英雄列表裏的所有英雄將會用於計算可能的排列組合並給出心情最高的前200個結果.<br>\
                            可添加的英雄冇有數量限製，添加英雄越多計算越慢.<br>\
                            你的英雄將會自動保存，不需要每次打開頁麵都重新選擇，但是清除頁麵Cookie將會丟失你保存的設定和英雄列表!<br>\
                            如果你使用的是\"列表\"視圖(可在搜索框右方切換) 點選\"+\" 號添加英雄至你的英雄列表<br>",
                  manage_heroes:"英雄列表管理",
                  manage_heroes_help:"在這個界麵你可以檢視所有保存的英雄.<br>\
                            點選英雄頭像上的 \"x\" 就可以刪除英雄.<br>\
                            點選英雄頭像可以鎖定英雄，被鎖定的英雄將會出現在所有的計算結果中.<br>\
                            你可以點選工具欄的篝火圖示計算露營心情，或者點選記事本圖示添加高級選項.<br>",                    
                  advanced_settings_help:"這裏可以進行高級設定.<br>\
                            <b style=\"color:red\">被鎖定的英雄不受高級設定影響</b><br><br>\
                            你可以選擇任意數量的選項，但是某些選項有特殊的限製.<br>\
                            例如你在職業一欄勾選超過4個職業就會報錯，因為一個隊伍最多不超過4個人.<br>\
                            因為被鎖定的英雄無視高級設定限製，所以如果你鎖定了 \"塔瑪林爾(偶像)\" 然後在高級設定的職業一欄選中了精靈師，那麼在計算結果中 除了偶像還會再添加一個精靈師. 對於Buff和Debuff也是同理<br>",
                  multilock_help:"每個欄位代表隊伍裏的一個位置, 每個欄位可以添加任意數量的英雄.<br>\
                            計算結果中的每一個位置，隻會出現對應欄位中的英雄. 同一個英雄不能被添加到多個欄位中.<br>\
                            空白的欄位對應你的英雄列表中剩餘的全部英雄.<br>\
                            如果你將所有的英雄加到前三個欄位中將會出現 \"所有英雄添加完畢，已無英雄可添加至下一個欄位!\" 的錯誤信息.<br>\
                            空白的欄位將會受到高級設定的影響.<br><br>\
                            每個欄位中被鎖定的英雄將無視高級設定的影響.<br>\
                            如果你所有欄位都放入了英雄，同時又選擇了任意一個高級設定， 將會報錯 \"隊伍人數超過上限!\" 並返回 0 個計算結果.<br>\
                            這個選項有助於創建自定義隊伍, 比如你將你所有的騎士放在一個欄位中，那麼你所有的計算結果裏就必定會出現一個騎士!<br>",
                  results_help : "這裏會出現根據你的設定篩選出的心情最高的前200個結果.<br>\
                             你的英雄列表裏至少要有4個英雄才能顯示結果.<br>\
                             你可以點選每個結果前麵的圖示保存對應的隊伍 (會彈出一個視窗要求你自定義隊伍名稱), 你保存的隊伍會出現在右下方齒輪圖示的\"設定\"一欄裏.<br>",

                  //Results window
                  risultati: "計算結果",
                  morale: "心情",
                  team: "隊伍",
                  topics: "對話",
                  abort_calculation: "中止計算",
                  confirm_worker_termination: "您確定要中止這次運算?",
                  notification_title: "E7 露營模擬器",
                  notification_ready: "結果計算完畢!",
                  results_error: "錯誤",
                  team_size_exceeded: "隊伍人數超過上限!",
                  not_enough_heroes: "所有英雄添加完畢，已無英雄可添加至下一個欄位!",
                  locked_sc_normal_err: "轉職英雄和轉職前英雄不能同時出現在一個隊伍!",

                  ///Result saving window:
                  camp_name_field: "隊伍名稱",
                  camp_name_placeholder: "你的隊伍名稱",
                  normal: "普通",
                  hell: "地獄",
                  queen: "阿吉曼夏洛斯女王",
                  arakahan: "捕食者阿拉哈坎",
                  karkanis: "執行者卡爾卡努斯",
                  vera: "侍從官培拉",
                  juleeve: "喬裏夫議會",
                  error_no_name_provided: "隊伍名稱不能為空!",
                  error_name_in_use: "該名稱已經被使用!",
                  saved_message: "保存成功!",
                  deleted_message: "刪除成功!",

                  impostazioni: "設定",
                  my_teams: "我的隊伍",
                  most_saved_teams: "常用隊伍&英雄",
                  refresh_team_stats: "刷新",
                  heroes: "英雄",
                  teams: "隊伍",
                  extras_map: "迷宮最佳路線",
                  raid: "逆襲迷宮",
                  nixied: "尼克斯特的聖所",
                  nixiedinfo: "尼克斯特的聖所地圖 by game8. 點選檢視詳細說明: ",

                  //Right click menu
                  view_on_e7db: " 前往EpicSevenDB.com檢視英雄詳細信息",
                  view_hero_model: "前往e7herder.com檢視英雄模型",
                  skills_not_enhanced: "技能已經覺醒但是並未強化",
                  e7api_missing_character: "在 EpicSevenDB 暫時找不到該英雄的信息",
                  e7api_couldnt_connect: "無法連接到 EpicSevenDB",

                  tema_notturno: "夜間模式",
                  vert_iconbar: "垂直工具欄",
                  notifiche: "啟用通知",
                  debug_camping_values: "調試: 顯示所有對話心情值",
                  hero_name_under_pic_grid: "在英雄頭像下方顯示英雄名字",
                  genera_url: "生成URL鏈接",
                  url_usage_help: "復制這個鏈接到新設備來導入你的英雄列表. <br>設備間並不會自動同步, 如果你修改了英雄列表，下次導入前需要重新生成URL鏈接.",
                  copia: "復制",
                  save: "保存",
                  confirm: "Confirm",
                  canc_btn: "取消",
                  back_btn: "返回",
                  selected: "Selected",
                  others: "其它",
                  language: "語言"
                };
              }else if (this.lingua == "fr") {
                this.strings = {
                  welcome: "Bienvenue",
                  whats_new: "Quoi de neuf",
                  instructions: "Instructions",
                  websites: "Sites web",
                  credits: "Crédits",
                  messaggio_di_benvenuto: "Bienvenue à E7 Camp Simulateur",
                  data_by: "Source EpicSevenDB",
                  all: "Tous",
                  sort: "Trier par",
                  filter: "Filter",
                  modified: "Date",
                  name: "Nom",
                  ingame_id: "ID",
                  remove_displayed_heroes: "Supprimer les héros affichés",
                  add_displayed_heroes: "Ajouter les héros affichés",
                  confirm_remove_heroes: "Voulez-vous vraiment supprimer <N> héros de votre liste?", // <N> is replaced by the number of heroes
                  confirm_add_heroes: "Voulez-vous vraiment ajouter <N> héros dans votre liste?", // <N> is replaced by the number of heroes
                  aggiungi: "Ajouter un héro ",
                  i_tuoi_eroi: "Votre héros",
                  cant_lock_more_heroes: "Impossible de verrouiller plus de 4 héros",
                  search: "Rechercher",
                  impostazioni_avanzate: "Paramètre avancé",
                  warn_tsize_adv_title: "Vous avez une grande liste de héros et aucun héros verrouillé",
                  warn_tsize_adv_details: "L'activation de toutes les fonctionnalités avancées augmentera le temps nécessaire pour calculer toutes les combinaisons. \nVous pouvez réduire le temps requis en verrouillant un héros.",
                  numero_massimo_risultati: "Nombre maximum de résultats de camping (MAX 10.000)",
                  morale_minimo_risultati: "Minimum morale",
                  includi_locked_in_adv: "Héros verrouillés inclus dans les paramètres avancés",
                  disabilita_immagini_in_risultati: "Désactiver l'avatar du héro dans l'écran des résultats (Améliorer les performances si vous demandez trop de résultats)",
                  deve_contenere_AoE: "L'équipe doit contenir AoE",
                  no_s1_debuffs: "S1 sans Debuff (Sauf: Provoquer, Sommeil, Etourdir et Poison)",
                  no_debuffs: "Non Debuff (Sauf: Provoquer, Sommeil, Etourdir et Poison)",
                  must_include_dispel: "L'équipe doit contenir stripper",
                  classe: "Classe",
                  attribute: "Attribute",
                  rarity: "Rarity",
                  elemento: "Elément",
                  buff: "Buff",
                  debuff: "Debuff",
                  combinations: "Combinaisons",
                  multilock: "Verrouillage multi",
                  multilock_slot: "Slot",
                  add_to_slot: "Ajouter dans ce slot",
                  add_selection: "Ajouter",
                  seleziona: "Selection",
                  deselect_all : "Tout déselectionner",
                  possibili_combinazioni: "Combinaisons possibles:",

                  //Help window
                  add_heroes_help: "Tap or click the portrait of a hero to add that hero to your roster.<br>\
                            Heroes in your roster will be used to calculate all possible combinations and return the best 200 combinations.<br>\
                            You can add as many heroes as you wish but the time needed to calculate all possible combinations will also increase.<br>\
                            Your roster will be saved and can be used everytime you visit this page without the need to add each hero everytime!<br>\
                            <br>\
                            If you are using the \"List\" display mode tap the \"+\" symbol to add a hero to your roster",
                  manage_heroes:"Manage Heroes",
                  manage_heroes_help:"In this window you can view all the heroes currently in your roster.<br>\
                            You can remove a hero by clicking the \"x\" at the bottom of the hero's portrait.<br>\
                            You can lock a hero by clicking he's portrait, a lock symbol will appear near the portrait. A locked hero will appear in every team in the results page.<br>\
                            You can calculate all the camping results for the current roster by clicking the bonfire icon in the toolbar or click the book icon to add advance settings.",                    
                  advanced_settings_help:"Here you can costumize your camp results.<br>\
                            <b style=\"color:red\">Locked heroes are not subject to these restrictions</b><br><br>\
                            You can select as many as you want but keep in mind time size while doing so.<br>\
                            For example if you lock 5 classes or 5 elements you will get a team size error.<br>\
                            Because locked heroes ignore advanced settings if you lock \"Tamarinne\" and select Soul weaver as a class you will get \"Tamarinne\" + another Soul weaver in every team. The same thing applies to Buffs and Debuffs<br>",
                  multilock_help:"Each slot is a space in your team, on each slot you can add as many heroes as you wish.<br>\
                            Only one of the Heroes locked for each slot will be in the results. The same hero can't be added on multiple slots.<br>\
                            Empty slots will be filled with the remaining heroes in your roster.<br>\
                            If you use all your heroes to fill 3 or less slots and no heroes are left to fill the remaining slots you will get a \"not enough heroes left\" error.<br>\
                            Slots that are left empty will be subject of restrictions from advanced settings.<br><br>\
                            Locked heroes in one of the slots will ignore advanced settings.<br>\
                            If you fill all the slots and select any advanced settings you will get a \"team size exceeded\" error or 0 results.<br>\
                            This option is useful to create costum rules, for example you can put all your knights in 1 slot and you will get a knight for each team in the results!",
                  results_help : "Here are displayed the best 200 combinations for your roster and current advanced settings.<br>\
                            You need at least 4 heroes in your current roster for any result to be displayed.<br>\
                            You can click the floppy disk icon to save a specific team composition (you will be prompted to input a name for that team), your saved teams will be displayed in the settings window.",

                  //Results window
                  risultati: "Résultat",
                  morale: "Morale",
                  team: "Equipe",
                  topics: "Conversations",
                  abort_calculation: "Annuler l'opération",
                  confirm_worker_termination: "Voulez-vous vraiment annuler cette opération?",
                  notification_title: "E7 Camp Simulateur",
                  notification_ready: "Calcul terminé!",
                  results_error: "Erreur",
                  team_size_exceeded: "Le nombre maximum de héros dans l'équipe dépassé!",
                  not_enough_heroes: "Il n'y aura plus de héro disponible pour la prochaine slot!",
                  locked_sc_normal_err: "SC héro et non SC version sont verrouillés en même temps!",

                  ///Result saving window:
                  camp_name_field: "Nom",
                  camp_name_placeholder: "Nom de votre equipe",
                  normal: "Normal",
                  hell: "Hell",
                  queen: "La Reine",
                  arakahan: "Arakahan",
                  karkanis: "Karkanis",
                  vera: "Vera",
                  juleeve: "Juleeve",
                  error_no_name_provided: "Le nom ne peut pas être vide!",
                  error_name_in_use: "Ce nom est déjà pris!",
                  saved_message: "Sauvgardée!",
                  deleted_message: "Supprimée!",

                  impostazioni: "Paramètres",
                  my_teams: "Mes équipes",
                  most_saved_teams: "Équipes & Héros les plus utilisés",
                  refresh_team_stats: "Rafraîchir",
                  heroes: "Héros",
                  teams: "Équipes",
                  extras_map: "Meilleur itinéraire pour Raid hell",
                  raid: "RAID",
                  nixied: "Nixied",
                  nixiedinfo: "Carte Nixied par game8. Lire le guide complet ici: ",

                  //Right click menu
                  view_on_e7db: "Voir les détails du héro sur EpicSevenDB.com",
                  view_hero_model: "Voir le modèle de héro sur e7herder.com",
                  skills_not_enhanced: "Les compétences sont éveillées mais pas améliorées",
                  e7api_missing_character: "Impossible de trouver ce héro sur EpicSevenDB",
                  e7api_couldnt_connect: "Impossible de se connecter à EpicSevenDB",

                  tema_notturno: "Mode nuit",
                  vert_iconbar: "Barre d'outils verticale",
                  notifiche: "Notification",
                  debug_camping_values: "Debug: Afficher tous les valeurs de conversation",
                  hero_name_under_pic_grid: "Afficher le nom du héros sous le portrait",
                  genera_url: "Générer une URL",
                  url_usage_help: "Copiez et collez cette URL sur un nouvel appareil ou navigateur pour générer une copie de votre liste de héros actuelle. <br>Les modifications ne sont pas synchronisées, si vous changez votre liste, vous devrez générer une nouvelle URL.",
                  copia: "Copier",
                  save: "Sauvgarde",
                  confirm: "Confirm",
                  canc_btn: "Annuler",
                  back_btn: "Retour",
                  selected: "selected",
                  others: "Autres",
                  language: "Langue"
                };
              } else {
                //this.lingua = "en";
                this.strings = {
                  welcome: "Welcome",
                  whats_new: "What's new",
                  instructions: "Instructions",
                  websites: "Websites",
                  credits: "Credits",
                  messaggio_di_benvenuto: "Welcome to Epic Seven Camp simulator",
                  data_by: "Data by EpicSevenDB",
                  all: "All",
                  sort: "Sort by",
                  filter: "Filter",
                  modified: "Date",
                  name: "Name",
                  ingame_id: "In-game ID",
                  remove_displayed_heroes: "Remove displayed heroes",
                  add_displayed_heroes: "Add displayed heroes",
                  confirm_remove_heroes: "Are you sure you want to remove <N> heroes from your roster?", // <N> is replaced by the number of heroes
                  confirm_add_heroes: "Are you sure you want to add <N> heroes to your roster?", // <N> is replaced by the number of heroes
                  aggiungi: "Add hero ",
                  i_tuoi_eroi: "Your heroes",
                  cant_lock_more_heroes: "Can't lock more than 4 heroes",
                  search: "Search",
                  impostazioni_avanzate: "Advanced settings",
                  warn_tsize_adv_title: "You have a large roster and no heroes locked",
                  warn_tsize_adv_details: "Activating any advanced features will increse the required time to calculate all the combinations. \nYou can reduce the required time by locking a hero.",
                  numero_massimo_risultati: "Maximum number of camping results (MAX 10.000)",
                  morale_minimo_risultati: "Minimum morale",
                  includi_locked_in_adv: "Locked heroes count towards the fulfillment of the selected advanced settings",
                  disabilita_immagini_in_risultati: "Disable character's avatar in results screen (better performance for your browser if you request too many results)",
                  deve_contenere_AoE: "Team must have AoE",
                  no_s1_debuffs: "No S1 Debuffs (Except: Provoke, Sleep, Stun and Poison)",
                  no_debuffs: "No Debuffs (Except: Provoke, Sleep, Stun and Poison)",
                  must_include_dispel: "Team must include dispel (remove enemy's buffs or reduce their duration)",
                  classe: "Class",
                  attribute: "Attribute",
                  rarity: "Rarity",
                  knight: "Knight",
                  warrior: "Warrior",
                  thief: "Thief",
                  ranger: "Ranger",
                  mage: "Mage",
                  "soul-weaver": "Soul Weaver",
                  fire: "Fire",
                  ice: "Ice",
                  earth: "Earth",
                  light: "Light",
                  dark: "Dark",
                  elemento: "Element",
                  buff: "Buff",
                  debuff: "Debuff",
                  combinations: "Possible combinations",
                  multilock: "Multi-lock (Cartesian Product)",
                  multilock_slot: "Slot",
                  add_to_slot: "Add to this slot",
                  seleziona: "Select",
                  deselect_all : "Deselect all",
                  add_selection: "Add selection",
                  possibili_combinazioni: "Combinations:",
                  
                  //Help window
                  add_heroes_help: "Tap or click the portrait of a hero to add that hero to your roster.<br>\
                            Heroes in your roster will be used to calculate all possible combinations and return the best 200 combinations.<br>\
                            You can add as many heroes as you wish but the time needed to calculate all possible combinations will also increase.<br>\
                            Your roster will be saved and can be used everytime you visit this page without the need to add each hero everytime!<br>\
                            <br>\
                            If you are using the \"List\" display mode tap the \"+\" symbol to add a hero to your roster",
                  manage_heroes:"Manage Heroes",
                  manage_heroes_help:"In this window you can view all the heroes currently in your roster.<br>\
                            You can remove a hero by clicking the \"x\" at the bottom of the hero's portrait.<br>\
                            You can lock a hero by clicking he's portrait, a lock symbol will appear near the portrait. A locked hero will appear in every team in the results page.<br>\
                            You can calculate all the camping results for the current roster by clicking the bonfire icon in the toolbar or click the book icon to add advance settings.",                    
                  advanced_settings_help:"Here you can costumize your camp results.<br>\
                            <b style=\"color:red\">Locked heroes are not subject to these restrictions</b><br><br>\
                            You can select as many as you want but keep in mind time size while doing so.<br>\
                            For example if you lock 5 classes or 5 elements you will get a team size error.<br>\
                            Because locked heroes ignore advanced settings if you lock \"Tamarinne\" and select Soul weaver as a class you will get \"Tamarinne\" + another Soul weaver in every team. The same thing applies to Buffs and Debuffs<br>",
                  multilock_help:"Each slot is a space in your team, on each slot you can add as many heroes as you wish.<br>\
                            Only one of the Heroes locked for each slot will be in the results. The same hero can't be added on multiple slots.<br>\
                            Empty slots will be filled with the remaining heroes in your roster.<br>\
                            If you use all your heroes to fill 3 or less slots and no heroes are left to fill the remaining slots you will get a \"not enough heroes left\" error.<br>\
                            Slots that are left empty will be subject of restrictions from advanced settings.<br><br>\
                            Locked heroes in one of the slots will ignore advanced settings.<br>\
                            If you fill all the slots and select any advanced settings you will get a \"team size exceeded\" error or 0 results.<br>\
                            This option is useful to create costum rules, for example you can put all your knights in 1 slot and you will get a knight for each team in the results!",
                  results_help : "Here are displayed the best 200 combinations for your roster and current advanced settings.<br>\
                            You need at least 4 heroes in your current roster for any result to be displayed.<br>\
                            You can click the floppy disk icon to save a specific team composition (you will be prompted to input a name for that team), your saved teams will be displayed in the settings window.",

                  //Results window
                  risultati: "Results",
                  morale: "Morale",
                  team: "Team",
                  topics: "Topics",
                  abort_calculation: "Abort operation",
                  confirm_worker_termination: "Are you sure you want to abort this operation?",
                  notification_title: "E7 Camp Simulator",
                  notification_ready: "Your results are ready!",
                  results_error: "Error",
                  team_size_exceeded: "Team size exceeded!",
                  not_enough_heroes: "No heroes to fill the remaining slots!",
                  locked_sc_normal_err: "Both SC and normal hero are locked",

                  ///Result saving window:
                  camp_name_field: "Camp name",
                  camp_name_placeholder: "Your camp's name",
                  normal: "Normal",
                  hell: "Hell",
                  queen: "Queen",
                  arakahan: "Arakahan",
                  karkanis: "Karkanis",
                  vera: "Vera",
                  juleeve: "Juleeve",
                  error_no_name_provided: "Name is required!",
                  error_name_in_use: "You are already using this name!",
                  saved_message: "saved successfully!",
                  deleted_message: "deleted!",

                  impostazioni: "Settings",
                  my_teams: "My teams",
                  most_saved_teams: "Most common teams",
                  refresh_team_stats: "Refresh",
                  heroes: "Heroes",
                  teams: "Teams",
                  extras_map: "Best hell raid route",
                  raid: "RAID",
                  nixied: "Nixied",
                  nixiedinfo: "Nixied's maps by game8. They have a full guide here: ",

                  //Right click menu
                  view_on_e7db: "View hero details on EpicSevenDB.com",
                  view_hero_model: "View hero model on e7herder.com",
                  skills_not_enhanced: "Skills are awakened but not enhanced",
                  e7api_missing_character: "Couldn't find this character on EpicSevenDB",
                  e7api_couldnt_connect: "Couldn't connect to EpicSevenDB",

                  tema_notturno: "Night theme",
                  vert_iconbar: "Vertical toolbar",
                  notifiche: "Enable notifications",
                  debug_camping_values: "Debug: Display camping values",
                  hero_name_under_pic_grid: "Hero's name under the portrait",
                  genera_url: "Generate URL",
                  url_usage_help: "Copy and paste this URL to a new device or browser to generate a copy of your current roster. <br>Changes are not synchronized, if you change your roster you will have to generate a new URL.",
                  copia: "Copy",
                  save: "Save",
                  confirm: "Confirm",
                  canc_btn: "Cancel",
                  back_btn: "Back",
                  selected: "Selected",
                  others: "Others",
                  language: "Language"
                };
              };


              if (this.lingua == "fr") {
                this.buffList["stic_debuf_impossible"].name = "Immunité";
                this.buffList["stic_att_up"].name = "Attaque augmentée";
                this.buffList["stic_att_up2"].name = "Attaque augmentée (sup.)";
                this.buffList["stic_def_up"].name = "Augmentation de défense";
                this.buffList["stic_speed_up"].name = "Vitesse augmentée";
                this.buffList["stic_dodge_up"].name = "Esquive augmentée";
                this.buffList["stic_protect"].name = "Barrière";
                this.buffList["stic_cri_up"].name = "Augm. Chances Coup Crit.";
                this.buffList["stic_cridmg_up"].name = "Augm. Dégâts Coup Crit.";
                this.buffList["stic_crires_up"].name = "Résistance Coups Critiques";
                this.buffList["stic_invincible"].name = "Invincibilité";
                this.buffList["stic_endure"].name = "Annulateur de compétence";
                this.buffList["stic_heal"].name = "Soin continu";
                this.buffList["stic_hide"].name = "Furtivité";
                this.buffList["stic_immortality"].name = "Immortalité";
                this.buffList["stic_reflect"].name = "Réflexion";
                this.buffList["stic_counter"].name = "Contre-attaque";

                this.debuffList["stic_def_dn"].name = "Réduction de la défense";
                this.debuffList["stic_speed_dn"].name = "Vitesse réduite";
                this.debuffList["stic_att_dn"].name = "Réduction de l'attaque";
                this.debuffList["stic_blind"].name = "Réduc. Chances Coup réussi";
                this.debuffList["stic_target"].name = "Cible";
                this.debuffList["stic_buf_impossible"].name = "Bonus impossible";
                this.debuffList["stic_heal_impossible"].name = "Inguérissable";
                this.debuffList["stic_stun"].name = "Étourdissement";
                this.debuffList["stic_provoke"].name = "Provocation";
                this.debuffList["stic_silence"].name = "Silence";
                this.debuffList["stic_sleep"].name = "Sommeil";
                this.debuffList["stic_blood"].name = "Hémorragie";
                this.debuffList["stic_dot"].name = "Poison";
                this.debuffList["stic_blaze"].name = "Brûlure";
                this.debuffList["stic_vampire"].name = "Toucher vampirique";
                this.debuffList["stic_bomb"].name = "Bombe";

                this.strings["knight"] = "Chevalier";
                this.strings["warrior"] = "Guerrier";
                this.strings["thief"] = "Assassin";
                this.strings["ranger"] = "Tireur";
                this.strings["mage"] = "Mage";
                this.strings["soul-weaver"] = "Tisseur d'âme";
                this.strings["fire"] = "Feu";
                this.strings["ice"] = "Glace";
                this.strings["earth"] = "Terre";
                this.strings["light"] = "Lumière";
                this.strings["dark"] = "Ténèbres";
              } else if (this.lingua == "jp") {
                this.buffList["stic_debuf_impossible"].name = "弱体効果免疫";
                this.buffList["stic_att_up"].name = "攻撃力UP";
                this.buffList["stic_att_up2"].name = "攻撃力UP(大)";
                this.buffList["stic_def_up"].name = "防御力UP";
                this.buffList["stic_speed_up"].name = "スピードUP";
                this.buffList["stic_dodge_up"].name = "回避率UP";
                this.buffList["stic_protect"].name = "シールド";
                this.buffList["stic_cri_up"].name = "クリティカル発生率UP";
                this.buffList["stic_cridmg_up"].name = "クリティカルダメージUP";
                this.buffList["stic_crires_up"].name = "クリティカル抵抗率UP";
                this.buffList["stic_invincible"].name = "無敵";
                this.buffList["stic_endure"].name = "スキルダメージ無効";
                this.buffList["stic_heal"].name = "持続回復";
                this.buffList["stic_hide"].name = "潜伏";
                this.buffList["stic_immortality"].name = "不死";
                this.buffList["stic_reflect"].name = "反射";
                this.buffList["stic_counter"].name = "反撃";

                this.debuffList["stic_def_dn"].name = "防御力DOWN";
                this.debuffList["stic_speed_dn"].name = "スピードDOWN";
                this.debuffList["stic_att_dn"].name = "攻撃力DOWN";
                this.debuffList["stic_blind"].name = "命中率DOWN";
                this.debuffList["stic_target"].name = "標的";
                this.debuffList["stic_buf_impossible"].name = "強化不可";
                this.debuffList["stic_heal_impossible"].name = "回復不可";
                this.debuffList["stic_stun"].name = "スタン";
                this.debuffList["stic_provoke"].name = "挑発";
                this.debuffList["stic_silence"].name = "沈黙";
                this.debuffList["stic_sleep"].name = "睡眠";
                this.debuffList["stic_blood"].name = "出血";
                this.debuffList["stic_dot"].name = "毒";
                this.debuffList["stic_blaze"].name = "火傷";
                this.debuffList["stic_vampire"].name = "吸血";
                this.debuffList["stic_bomb"].name = "爆弾";

                this.strings["knight"] = "ナイト";
                this.strings["warrior"] = "ウォリアー";
                this.strings["thief"] = "アサシン";
                this.strings["ranger"] = "アーチャー";
                this.strings["mage"] = "メイジ";
                this.strings["soul-weaver"] = "プリースト";
                this.strings["fire"] = "火属性";
                this.strings["ice"] = "氷属性";
                this.strings["earth"] = "木属性";
                this.strings["light"] = "光属性";
                this.strings["dark"] = "闇属性";
              } else if (this.lingua == "kr") {
                this.buffList["stic_debuf_impossible"].name = "면역";
                this.buffList["stic_att_up"].name = "공격력 증가";
                this.buffList["stic_att_up2"].name = "공격력 증가 (대)";
                this.buffList["stic_def_up"].name = "방어력 증가";
                this.buffList["stic_speed_up"].name = "속도 증가";
                this.buffList["stic_dodge_up"].name = "회피 증가";
                this.buffList["stic_protect"].name = "보호막";
                this.buffList["stic_cri_up"].name = "치명확률 증가";
                this.buffList["stic_cridmg_up"].name = "치명피해 증가";
                this.buffList["stic_crires_up"].name = "치명저항 증가";
                this.buffList["stic_invincible"].name = "무적";
                this.buffList["stic_endure"].name = "스킬 대미지 무효";
                this.buffList["stic_heal"].name = "지속 회복";
                this.buffList["stic_hide"].name = "은신";
                this.buffList["stic_immortality"].name = "불사";
                this.buffList["stic_reflect"].name = "반사";
                this.buffList["stic_counter"].name = "반격";

                this.debuffList["stic_def_dn"].name = "방어력 감소";
                this.debuffList["stic_speed_dn"].name = "속도 감소";
                this.debuffList["stic_att_dn"].name = "공격력 감소";
                this.debuffList["stic_blind"].name = "명중 감소";
                this.debuffList["stic_target"].name = "표적";
                this.debuffList["stic_buf_impossible"].name = "강화 불가";
                this.debuffList["stic_heal_impossible"].name = "회복 불가";
                this.debuffList["stic_stun"].name = "기절";
                this.debuffList["stic_provoke"].name = "도발";
                this.debuffList["stic_silence"].name = "침묵";
                this.debuffList["stic_sleep"].name = "수면";
                this.debuffList["stic_blood"].name = "출혈";
                this.debuffList["stic_dot"].name = "중독";
                this.debuffList["stic_blaze"].name = "화상";
                this.debuffList["stic_vampire"].name = "흡혈의 손길";
                this.debuffList["stic_bomb"].name = "폭탄";

                this.strings["knight"] = "기사";
                this.strings["warrior"] = "전사";
                this.strings["thief"] = "도적";
                this.strings["ranger"] = "사수";
                this.strings["mage"] = "마도사";
                this.strings["soul-weaver"] = "정령사";
                this.strings["fire"] = "화염속성";
                this.strings["ice"] = "냉기속성";
                this.strings["earth"] = "자연속성";
                this.strings["light"] = "광속성";
                this.strings["dark"] = "암속성";
              } else if (lingua == "cn") {
                this.buffList["stic_debuf_impossible"].name = "免疫";
                this.buffList["stic_att_up"].name = "攻击力增加";
                this.buffList["stic_att_up2"].name = "攻击力大幅增加";
                this.buffList["stic_def_up"].name = "防御力增加";
                this.buffList["stic_speed_up"].name = "速度提升";
                this.buffList["stic_dodge_up"].name = "增加回避";
                this.buffList["stic_protect"].name = "防护罩";
                this.buffList["stic_cri_up"].name = "暴击率增加";
                this.buffList["stic_cridmg_up"].name = "增加暴击伤害";
                this.buffList["stic_crires_up"].name = "暴击抗性增加";
                this.buffList["stic_invincible"].name = "无敌";
                this.buffList["stic_endure"].name = "技能伤害无效";
                this.buffList["stic_heal"].name = "持续恢复";
                this.buffList["stic_hide"].name = "隐身";
                this.buffList["stic_immortality"].name = "不死";
                this.buffList["stic_reflect"].name = "反射";
                this.buffList["stic_counter"].name = "反击";

                this.debuffList["stic_def_dn"].name = "防御力减少";
                this.debuffList["stic_speed_dn"].name = "速度下降";
                this.debuffList["stic_att_dn"].name = "攻击力减少";
                this.debuffList["stic_blind"].name = "命中减少";
                this.debuffList["stic_target"].name = "标靶";
                this.debuffList["stic_buf_impossible"].name = "无法强化";
                this.debuffList["stic_heal_impossible"].name = "无法恢复";
                this.debuffList["stic_stun"].name = "晕眩";
                this.debuffList["stic_provoke"].name = "挑衅";
                this.debuffList["stic_silence"].name = "沉默";
                this.debuffList["stic_sleep"].name = "睡眠";
                this.debuffList["stic_blood"].name = "出血";
                this.debuffList["stic_dot"].name = "中毒";
                this.debuffList["stic_blaze"].name = "烧伤";
                this.debuffList["stic_vampire"].name = "吸血之手";
                this.debuffList["stic_bomb"].name = "炸弹";
              } else if (lingua == "zht") {
                this.buffList["stic_debuf_impossible"].name = "免疫";
                this.buffList["stic_att_up"].name = "攻擊力增加";
                this.buffList["stic_att_up2"].name = "攻擊力大幅增加";
                this.buffList["stic_def_up"].name = "防禦力增加";
                this.buffList["stic_speed_up"].name = "速度提升";
                this.buffList["stic_dodge_up"].name = "增加迴避";
                this.buffList["stic_protect"].name = "防護罩";
                this.buffList["stic_cri_up"].name = "暴擊率增加";
                this.buffList["stic_cridmg_up"].name = "增加暴擊傷害";
                this.buffList["stic_crires_up"].name = "暴擊抗性增加";
                this.buffList["stic_invincible"].name = "無敵";
                this.buffList["stic_endure"].name = "技能傷害無效";
                this.buffList["stic_heal"].name = "持續恢復";
                this.buffList["stic_hide"].name = "隱身";
                this.buffList["stic_immortality"].name = "不死";
                this.buffList["stic_reflect"].name = "反射";
                this.buffList["stic_counter"].name = "反擊";

                this.debuffList["stic_def_dn"].name = "防禦力減少";
                this.debuffList["stic_speed_dn"].name = "速度下降";
                this.debuffList["stic_att_dn"].name = "攻擊力減少";
                this.debuffList["stic_blind"].name = "命中減少";
                this.debuffList["stic_target"].name = "標靶";
                this.debuffList["stic_buf_impossible"].name = "無法強化";
                this.debuffList["stic_heal_impossible"].name = "無法恢復";
                this.debuffList["stic_stun"].name = "暈眩";
                this.debuffList["stic_provoke"].name = "挑釁";
                this.debuffList["stic_silence"].name = "沉默";
                this.debuffList["stic_sleep"].name = "睡眠";
                this.debuffList["stic_blood"].name = "出血";
                this.debuffList["stic_dot"].name = "中毒";
                this.debuffList["stic_blaze"].name = "燒傷";
                this.debuffList["stic_vampire"].name = "吸血之手";
                this.debuffList["stic_bomb"].name = "炸彈";
              } else if (lingua == "th") {
                this.buffList["stic_debuf_impossible"].name = "ภูมิคุ้มกัน";
                this.buffList["stic_att_up"].name = "เพิ่มพลังโจมตี";
                this.buffList["stic_att_up2"].name = "เพิ่มพลังโจมตี (ชั้นสูง)";
                this.buffList["stic_def_up"].name = "เพิ่มพลังป้องกัน";
                this.buffList["stic_speed_up"].name = "เพิ่มความเร็ว";
                this.buffList["stic_dodge_up"].name = "เพิ่มการหลบหลีก";
                this.buffList["stic_protect"].name = "บาเรีย";
                this.buffList["stic_cri_up"].name = "เพิ่มโอกาสคริติคอล";
                this.buffList["stic_cridmg_up"].name = "เพิ่มดาเมจคริติคอล";
                this.buffList["stic_crires_up"].name = "เพิ่มความต้านทานคริติคอล";
                this.buffList["stic_invincible"].name = "คงกระพัน";
                this.buffList["stic_endure"].name = "ล้างดาเมจสกิล";
                this.buffList["stic_heal"].name = "รักษาต่อเนื่อง";
                this.buffList["stic_hide"].name = "ซ่อนตัว";
                this.buffList["stic_immortality"].name = "อมตะ";
                this.buffList["stic_reflect"].name = "สะท้อน";
                this.buffList["stic_counter"].name = "โจมตีโต้กลับ";

                this.debuffList["stic_def_dn"].name = "ลดพลังป้องกัน";
                this.debuffList["stic_speed_dn"].name = "ลดความเร็ว";
                this.debuffList["stic_att_dn"].name = "ลดพลังโจมตี";
                this.debuffList["stic_blind"].name = "ลดความแม่นยำ";
                this.debuffList["stic_target"].name = "ตกเป็นเป้า";
                this.debuffList["stic_buf_impossible"].name = "ห้ามบัฟ";
                this.debuffList["stic_heal_impossible"].name = "ห้ามการฟื้นฟู";
                this.debuffList["stic_stun"].name = "สตัน";
                this.debuffList["stic_provoke"].name = "ยั่วยุ";
                this.debuffList["stic_silence"].name = "เป็นใบ้";
                this.debuffList["stic_sleep"].name = "หลับ";
                this.debuffList["stic_blood"].name = "เลือดไหล";
                this.debuffList["stic_dot"].name = "พิษ";
                this.debuffList["stic_blaze"].name = "เผาไหม้";
                this.debuffList["stic_vampire"].name = "สัมผัสแวมไพร์";
                this.debuffList["stic_bomb"].name = "ระเบิด";
              } else if (lingua == "es") {
                this.buffList["stic_debuf_impossible"].name = "Inmunidad";
                this.buffList["stic_att_up"].name = "Aumenta el ataque";
                this.buffList["stic_att_up2"].name = "Aumenta el ataque (mayor)";
                this.buffList["stic_def_up"].name = "Aumenta la defensa";
                this.buffList["stic_speed_up"].name = "Aumenta la velocidad";
                this.buffList["stic_dodge_up"].name = "Aumenta la evasión";
                this.buffList["stic_protect"].name = "Barrera";
                this.buffList["stic_cri_up"].name = "Aumenta la probabilidad de golpe crítico";
                this.buffList["stic_cridmg_up"].name = "Aumenta el daño de golpe crítico";
                this.buffList["stic_crires_up"].name = "Aumenta la resistencia a golpes críticos";
                this.buffList["stic_invincible"].name = "Invencible";
                this.buffList["stic_endure"].name = "Anulador de habilidades";
                this.buffList["stic_heal"].name = "Curación continua";
                this.buffList["stic_hide"].name = "Sigilo";
                this.buffList["stic_immortality"].name = "Inmortalidad";
                this.buffList["stic_reflect"].name = "Reflejar";
                this.buffList["stic_counter"].name = "Contraataque";

                this.debuffList["stic_def_dn"].name = "Disminuye la defensa";
                this.debuffList["stic_speed_dn"].name = "Disminuye la velocidad";
                this.debuffList["stic_att_dn"].name = "Disminuye el ataque";
                this.debuffList["stic_blind"].name = "Disminuir probabilidad de golpe";
                this.debuffList["stic_target"].name = "Blanco";
                this.debuffList["stic_buf_impossible"].name = "No se puede potenciar";
                this.debuffList["stic_heal_impossible"].name = "Incurable";
                this.debuffList["stic_stun"].name = "Aturdimiento";
                this.debuffList["stic_provoke"].name = "Provocación";
                this.debuffList["stic_silence"].name = "Silencio";
                this.debuffList["stic_sleep"].name = "Sueño";
                this.debuffList["stic_blood"].name = "Hemorragia";
                this.debuffList["stic_dot"].name = "Veneno";
                this.debuffList["stic_blaze"].name = "Quemadura";
                this.debuffList["stic_vampire"].name = "Toque vampírico";
                this.debuffList["stic_bomb"].name = "Bomba";
              } else if (lingua == "pt") {
                this.buffList["stic_debuf_impossible"].name = "Imune";
                this.buffList["stic_att_up"].name = "Aumentar Ataque";
                this.buffList["stic_att_up2"].name = "Aumentar Ataque (Superior)";
                this.buffList["stic_def_up"].name = "Aumentar Defesa";
                this.buffList["stic_speed_up"].name = "Aumentar Velocidade";
                this.buffList["stic_dodge_up"].name = "Aumentar Evasão";
                this.buffList["stic_protect"].name = "Barreira";
                this.buffList["stic_cri_up"].name = "Aumentar Chance de Crítico";
                this.buffList["stic_cridmg_up"].name = "Aumentar Dano Crítico";
                this.buffList["stic_crires_up"].name = "Aumentar Resistência a Crítico";
                this.buffList["stic_invincible"].name = "Invencível";
                this.buffList["stic_endure"].name = "Anulador de Habilidades";
                this.buffList["stic_heal"].name = "Cura Contínua";
                this.buffList["stic_hide"].name = "Furtividade";
                this.buffList["stic_immortality"].name = "Imortal";
                this.buffList["stic_reflect"].name = "Refletir";
                this.buffList["stic_counter"].name = "Contra-Ataque";

                this.debuffList["stic_def_dn"].name = "Diminuir Defesa";
                this.debuffList["stic_speed_dn"].name = "Diminuir Velocidade";
                this.debuffList["stic_att_dn"].name = "Diminuir Ataque";
                this.debuffList["stic_blind"].name = "Diminuir Chance de Acerto";
                this.debuffList["stic_target"].name = "Alvo";
                this.debuffList["stic_buf_impossible"].name = "Bloqueio de Reforço";
                this.debuffList["stic_heal_impossible"].name = "Incurável";
                this.debuffList["stic_stun"].name = "Atordoamento";
                this.debuffList["stic_provoke"].name = "Provocação";
                this.debuffList["stic_silence"].name = "Silêncio";
                this.debuffList["stic_sleep"].name = "Dormindo";
                this.debuffList["stic_blood"].name = "Sangramento";
                this.debuffList["stic_dot"].name = "Veneno";
                this.debuffList["stic_blaze"].name = "Queimar";
                this.debuffList["stic_vampire"].name = "Toque Vampiresco";
                this.debuffList["stic_bomb"].name = "Bomba";
              } else if (lingua == "de") {
                this.buffList["stic_debuf_impossible"].name = "Immun";
                this.buffList["stic_att_up"].name = "Angriff erhöhen";
                this.buffList["stic_att_up2"].name = "Angriff erhöhen (stark)";
                this.buffList["stic_def_up"].name = "Verteidigung erhöhen";
                this.buffList["stic_speed_up"].name = "Geschwindigkeit erhöhen";
                this.buffList["stic_dodge_up"].name = "Ausweichen erhöhen";
                this.buffList["stic_protect"].name = "Barriere";
                this.buffList["stic_cri_up"].name = "Kritische Trefferquote erhöhen";
                this.buffList["stic_cridmg_up"].name = "Kritischen Schaden erhöhen";
                this.buffList["stic_crires_up"].name = "Kritischen Widerstand erhöhen";
                this.buffList["stic_invincible"].name = "Unbesiegbar";
                this.buffList["stic_endure"].name = "Fertigkeit-Aufhebung";
                this.buffList["stic_heal"].name = "Kontinuierliche Heilung";
                this.buffList["stic_hide"].name = "Tarnung";
                this.buffList["stic_immortality"].name = "Unsterblich";
                this.buffList["stic_reflect"].name = "Reflektieren";
                this.buffList["stic_counter"].name = "Gegenangriff";

                this.debuffList["stic_def_dn"].name = "Verteidigung verringern";
                this.debuffList["stic_speed_dn"].name = "Geschwindigkeit verringern";
                this.debuffList["stic_att_dn"].name = "Angriff verringern";
                this.debuffList["stic_blind"].name = "Trefferquote verringern";
                this.debuffList["stic_target"].name = "Ziel";
                this.debuffList["stic_buf_impossible"].name = "Buffblockade";
                this.debuffList["stic_heal_impossible"].name = "Unheilbar";
                this.debuffList["stic_stun"].name = "Betäubung";
                this.debuffList["stic_provoke"].name = "Provozieren";
                this.debuffList["stic_silence"].name = "Stille";
                this.debuffList["stic_sleep"].name = "Schlaf";
                this.debuffList["stic_blood"].name = "Bluten";
                this.debuffList["stic_dot"].name = "Gift";
                this.debuffList["stic_blaze"].name = "Verbrennen";
                this.debuffList["stic_vampire"].name = "Vampirische Berührung";
                this.debuffList["stic_bomb"].name = "Bombe";
              } else { // eng or ita
                this.buffList["stic_debuf_impossible"].name = "Immunity";
                this.buffList["stic_att_up"].name = "Attack up";
                this.buffList["stic_att_up2"].name = "Attack up (Greater)";
                this.buffList["stic_def_up"].name = "Defense up";
                this.buffList["stic_speed_up"].name = "Speed up";
                this.buffList["stic_dodge_up"].name = "Evasion";
                this.buffList["stic_protect"].name = "Barrier";
                this.buffList["stic_cri_up"].name = "Crit chance up";
                this.buffList["stic_cridmg_up"].name = "Crit damage up";
                this.buffList["stic_crires_up"].name = "Crit Resistance";
                this.buffList["stic_invincible"].name = "Invincibility";
                this.buffList["stic_endure"].name = "Skill nullifier";
                this.buffList["stic_heal"].name = "Continuous Healing";
                this.buffList["stic_hide"].name = "Stealth";
                this.buffList["stic_immortality"].name = "Immortality";
                this.buffList["stic_reflect"].name = "Reflect";
                this.buffList["stic_counter"].name = "Counter";

                this.debuffList["stic_def_dn"].name = "Def down";
                this.debuffList["stic_speed_dn"].name = "Speed down";
                this.debuffList["stic_att_dn"].name = "Attack down";
                this.debuffList["stic_blind"].name = "Blind";
                this.debuffList["stic_target"].name = "Target";
                this.debuffList["stic_buf_impossible"].name = "Unbuffable";
                this.debuffList["stic_heal_impossible"].name = "Unhealable";
                this.debuffList["stic_stun"].name = "Stun";
                this.debuffList["stic_provoke"].name = "Provoke";
                this.debuffList["stic_silence"].name = "Silence";
                this.debuffList["stic_sleep"].name = "Sleep";
                this.debuffList["stic_blood"].name = "Bleed";
                this.debuffList["stic_dot"].name = "Poison";
                this.debuffList["stic_blaze"].name = "Burn";
                this.debuffList["stic_vampire"].name = "Vampire";
                this.debuffList["stic_bomb"].name = "Bomb";
              };
            },
      translateTopics: function (n) {
          if (this.lingua == "jp") {
            switch (n) {
              case 'Criticism':
                return '世界批判';
                break;
              case 'Reality Check':
                return '現実的な話題';
                break;
              case 'Heroic Tale':
                return '武勇伝';
                break;
              case 'Comforting Cheer':
                return '励まし';
                break;
              case 'Cute Cheer':
                return '応援';
                break;
              case 'Heroic Cheer':
                return '英雄応援';
                break;
              case 'Sad Memory':
                return '悲しい思い出';
                break;
              case 'Joyful Memory':
                return '楽しい思い出';
                break;
              case 'Happy Memory':
                return '幸せな思い出';
                break;
              case 'Unique Comment':
                return '不思議ちゃん';
                break;
              case 'Self-Indulgent':
                return '自己愛';
                break;
              case 'Occult':
                return 'オカルト';
                break;
              case 'Myth':
                return '神話';
                break;
              case 'Bizarre Story':
                return '猟奇的な話';
                break;
              case 'Food Story':
                return 'グルメ';
                break;
              case 'Horror Story':
                return 'ホラー';
                break;
              case 'Gossip':
                return 'ゴシップ';
                break;
              case 'Dream':
                return '夢';
                break;
              case 'Advice':
                return '悩み相談';
                break;
              case 'Complain':
                return '愚痴';
                break;
              case 'Belief':
                return '信念';
                break;
              case 'Interesting Story':
                return '冒険話';
                break;
              default:
                return n;
                break;
            };
          } else if (this.lingua == "cn") {
            switch (n) {
              case 'Criticism':
                return '批判世界';
                break;
              case 'Reality Check':
                return '正视现实';
                break;
              case 'Heroic Tale':
                return '英雄故事';
                break;
              case 'Comforting Cheer':
                return '安慰助阵';
                break;
              case 'Cute Cheer':
                return '撒娇助阵';
                break;
              case 'Heroic Cheer':
                return '英雄式助阵';
                break;
              case 'Sad Memory':
                return '伤心回忆';
                break;
              case 'Joyful Memory':
                return '愉快回忆';
                break;
              case 'Happy Memory':
                return '幸福回忆';
                break;
              case 'Unique Comment':
                return '4次元的发言';
                break;
              case 'Self-Indulgent':
                return '自我陶醉';
                break;
              case 'Occult':
                return '秘术';
                break;
              case 'Myth':
                return '神话';
                break;
              case 'Bizarre Story':
                return '猎奇的故事';
                break;
              case 'Food Story':
                return '食物故事';
                break;
              case 'Horror Story':
                return '恐怖故事';
                break;
              case 'Gossip':
                return '八卦';
                break;
              case 'Dream':
                return '梦';
                break;
              case 'Advice':
                return '烦恼咨询';
                break;
              case 'Complain':
                return '耍赖';
                break;
              case 'Belief':
                return '信念';
                break;
              case 'Interesting Story':
                return '冒险故事';
                break;
              default:
                return n;
                break;
            };
          } else if (this.lingua == "zht") {
            switch (n) {
              case 'Criticism':
                return '批判世界';
                break;
              case 'Reality Check':
                return '正視現實';
                break;
              case 'Heroic Tale':
                return '英雄故事';
                break;
              case 'Comforting Cheer':
                return '安慰助陣';
                break;
              case 'Cute Cheer':
                return '撒嬌助陣';
                break;
              case 'Heroic Cheer':
                return '英雄式助陣';
                break;
              case 'Sad Memory':
                return '傷心回憶';
                break;
              case 'Joyful Memory':
                return '愉快回憶';
                break;
              case 'Happy Memory':
                return '幸福回憶';
                break;
              case 'Unique Comment':
                return '4次元的發言';
                break;
              case 'Self-Indulgent':
                return '自我陶醉';
                break;
              case 'Occult':
                return '秘術';
                break;
              case 'Myth':
                return '神話';
                break;
              case 'Bizarre Story':
                return '獵奇的故事';
                break;
              case 'Food Story':
                return '食物故事';
                break;
              case 'Horror Story':
                return '恐怖故事';
                break;
              case 'Gossip':
                return '八卦';
                break;
              case 'Dream':
                return '夢';
                break;
              case 'Advice':
                return '煩惱諮詢';
                break;
              case 'Complain':
                return '耍賴';
                break;
              case 'Belief':
                return '信念';
                break;
              case 'Interesting Story':
                return '冒險故事';
                break;
              default:
                return n;
                break;
            };
          } else if (this.lingua == "fr") {
            switch (n) {
              case 'Criticism':
                return 'Critique';
                break;
              case 'Reality Check':
                return 'Rappel à la réalité';
                break;
              case 'Heroic Tale':
                return 'Histoire héroïque';
                break;
              case 'Comforting Cheer':
                return 'Encouragement consolant';
                break;
              case 'Cute Cheer':
                return 'Encouragement adorable';
                break;
              case 'Heroic Cheer':
                return 'Encouragement héroïque';
                break;
              case 'Sad Memory':
                return 'Souvenir triste';
                break;
              case 'Joyful Memory':
                return 'Souvenir joyeux';
                break;
              case 'Happy Memory':
                return 'Souvenir heureux';
                break;
              case 'Unique Comment':
                return 'Commentaire particulier';
                break;
              case 'Self-Indulgent':
                return 'Complaisant';
                break;
              case 'Occult':
                return 'Occulte';
                break;
              case 'Myth':
                return 'Mythe';
                break;
              case 'Bizarre Story':
                return 'Histoire bizarre';
                break;
              case 'Food Story':
                return 'Histoire appétissante';
                break;
              case 'Horror Story':
                return 'Histoire lugubre';
                break;
              case 'Gossip':
                return 'Potin';
                break;
              case 'Dream':
                return 'Rêve';
                break;
              case 'Advice':
                return 'Conseil';
                break;
              case 'Complain':
                return 'Plainte';
                break;
              case 'Belief':
                return 'Croyance';
                break;
              case 'Interesting Story':
                return 'Anecdote';
                break;
              default:
                return n;
                break;
            };
          } else if (this.lingua == "th") {
            switch (n) {
              case 'Criticism':
                return 'วิพากษ์วิจารณ์';
                break;
              case 'Reality Check':
                return 'ย้ำเตือนถึงความเป็นจริง';
                break;
              case 'Heroic Tale':
                return 'เรื่องเล่าวีรกรรม';
                break;
              case 'Comforting Cheer':
                return 'ให้กำลังใจเพื่อปลอบโยน';
                break;
              case 'Cute Cheer':
                return 'ให้กำลังใจอย่างน่ารัก';
                break;
              case 'Heroic Cheer':
                return 'ให้กำลังใจอย่างกล้าหาญ';
                break;
              case 'Sad Memory':
                return 'ความทรงจำแสนเศร้า';
                break;
              case 'Joyful Memory':
                return 'ความทรงจำอันเบิกบาน';
                break;
              case 'Happy Memory':
                return 'ความทรงจำแสนสุข';
                break;
              case 'Unique Comment':
                return 'ความคิดเห็นที่เป็นเอกลักษณ์';
                break;
              case 'Self-Indulgent':
                return 'พูดจาหลงตัวเอง';
                break;
              case 'Occult':
                return 'ลัทธิ';
                break;
              case 'Myth':
                return 'ตำนาน';
                break;
              case 'Bizarre Story':
                return 'เรื่องประหลาด';
                break;
              case 'Food Story':
                return 'เรื่องอาหาร';
                break;
              case 'Horror Story':
                return 'เรื่องสยอง';
                break;
              case 'Gossip':
                return 'เรื่องกอสซิป';
                break;
              case 'Dream':
                return 'ความฝัน';
                break;
              case 'Advice':
                return 'คำแนะนำ';
                break;
              case 'Complain':
                return 'คำบ่น';
                break;
              case 'Belief':
                return 'ความเชื่อ';
                break;
              case 'Interesting Story':
                return 'เรื่องน่าสนใจ';
                break;
              default:
                return n;
                break;
            };
          } else if (this.lingua == "kr") {
            switch (n) {
              case 'Criticism':
                return '세계 비판';
                break;
              case 'Reality Check':
                return '현실직시';
                break;
              case 'Heroic Tale':
                return '무용담';
                break;
              case 'Comforting Cheer':
                return '위로 응원';
                break;
              case 'Cute Cheer':
                return '애교 응원';
                break;
              case 'Heroic Cheer':
                return '영웅적 응원';
                break;
              case 'Sad Memory':
                return '슬픈 추억';
                break;
              case 'Joyful Memory':
                return '즐거운 추억';
                break;
              case 'Happy Memory':
                return '행복한 추억';
                break;
              case 'Unique Comment':
                return '차원 발언';
                break;
              case 'Self-Indulgent':
                return '자아도취';
                break;
              case 'Occult':
                return '오컬트';
                break;
              case 'Myth':
                return '신화';
                break;
              case 'Bizarre Story':
                return '엽기적 이야기';
                break;
              case 'Food Story':
                return '음식 이야기';
                break;
              case 'Horror Story':
                return '공포 이야기';
                break;
              case 'Gossip':
                return '가십';
                break;
              case 'Dream':
                return '꿈';
                break;
              case 'Advice':
                return '고민 상담';
                break;
              case 'Complain':
                return '투정';
                break;
              case 'Belief':
                return '신념';
                break;
              case 'Interesting Story':
                return '모험이야기';
                break;
              default:
                return n;
                break;
            };
          } else if (this.lingua == "es") {
            switch (n) {
              case 'Criticism':
                return 'Crítica';
                break;
              case 'Reality Check':
                return 'Asume la realidad';
                break;
              case 'Heroic Tale':
                return 'Relato heroico';
                break;
              case 'Comforting Cheer':
                return 'Vitoreo reconfortante';
                break;
              case 'Cute Cheer':
                return 'Vitoreo tierno';
                break;
              case 'Heroic Cheer':
                return 'Vitoreo heroico';
                break;
              case 'Sad Memory':
                return 'Recuerdo triste';
                break;
              case 'Joyful Memory':
                return 'Recuerdo feliz';
                break;
              case 'Happy Memory':
                return 'Recuerdo alegre';
                break;
              case 'Unique Comment':
                return 'Comentario único';
                break;
              case 'Self-Indulgent':
                return 'Hedonista';
                break;
              case 'Occult':
                return 'Místico';
                break;
              case 'Myth':
                return 'Mito';
                break;
              case 'Bizarre Story':
                return 'Historia extraña';
                break;
              case 'Food Story':
                return 'Historia sobre comida';
                break;
              case 'Horror Story':
                return 'Historia de terror';
                break;
              case 'Gossip':
                return 'Rumor';
                break;
              case 'Dream':
                return 'Sueño';
                break;
              case 'Advice':
                return 'Consejo';
                break;
              case 'Complain':
                return 'Queja';
                break;
              case 'Belief':
                return 'Creencia';
                break;
              case 'Interesting Story':
                return 'Historia interesante';
                break;
              default:
                return n;
                break;
            };
          } else if (this.lingua == "pt") {
            switch (n) {
              case 'Criticism':
                return 'Crítica';
                break;
              case 'Reality Check':
                return 'Papo Realista';
                break;
              case 'Heroic Tale':
                return 'Conto Heroico';
                break;
              case 'Comforting Cheer':
                return 'Consolar';
                break;
              case 'Cute Cheer':
                return 'Animar';
                break;
              case 'Heroic Cheer':
                return 'Encorajar';
                break;
              case 'Sad Memory':
                return 'Lembrança Triste';
                break;
              case 'Joyful Memory':
                return 'Lembrança Animada';
                break;
              case 'Happy Memory':
                return 'Lembrança Feliz';
                break;
              case 'Unique Comment':
                return 'Comentário Singular';
                break;
              case 'Self-Indulgent':
                return 'Complacência';
                break;
              case 'Occult':
                return 'Ocultismo';
                break;
              case 'Myth':
                return 'Mito';
                break;
              case 'Bizarre Story':
                return 'História Bizarra';
                break;
              case 'Food Story':
                return 'História de Comida';
                break;
              case 'Horror Story':
                return 'História de Terror';
                break;
              case 'Gossip':
                return 'Fofoca';
                break;
              case 'Dream':
                return 'Sonho';
                break;
              case 'Advice':
                return 'Conselho';
                break;
              case 'Complain':
                return 'Reclamação';
                break;
              case 'Belief':
                return 'Crença';
                break;
              case 'Interesting Story':
                return 'História Interessante';
                break;
              default:
                return n;
                break;
            };
          } else if (this.lingua == "de") {
            switch (n) {
              case 'Criticism':
                return 'Kritik';
                break;
              case 'Reality Check':
                return 'Realitäts-Check';
                break;
              case 'Heroic Tale':
                return 'Heroische Erzählung';
                break;
              case 'Comforting Cheer':
                return 'Tröstlicher Jubel';
                break;
              case 'Cute Cheer':
                return 'Niedlicher Jubel';
                break;
              case 'Heroic Cheer':
                return 'Heroischer Jubel';
                break;
              case 'Sad Memory':
                return 'Traurige Erinnerung';
                break;
              case 'Joyful Memory':
                return 'Fröhliche Erinnerung';
                break;
              case 'Happy Memory':
                return 'Glückliche Erinnerung';
                break;
              case 'Unique Comment':
                return 'Einzigartiger Kommentar';
                break;
              case 'Self-Indulgent':
                return 'Ausschweifend';
                break;
              case 'Occult':
                return 'Okkult';
                break;
              case 'Myth':
                return 'Mythos';
                break;
              case 'Bizarre Story':
                return 'Bizarre Geschichte';
                break;
              case 'Food Story':
                return 'Nahrungsgeschichte';
                break;
              case 'Horror Story':
                return 'Horrorgeschichte';
                break;
              case 'Gossip':
                return 'Tratsch';
                break;
              case 'Dream':
                return 'Traum';
                break;
              case 'Advice':
                return 'Rat';
                break;
              case 'Complain':
                return 'Beschwerde';
                break;
              case 'Belief':
                return 'Glaube';
                break;
              case 'Interesting Story':
                return 'Interessante Geschichte';
                break;
              default:
                return n;
                break;
            };
          } else {
            return n;
          };
      },
      getUserHeroesBoot: function () { // read user's local storage team
        var tmp = localStorage.getItem('Heroes') ? localStorage.getItem('Heroes') : '{}';
        tmp = JSON.parse(tmp);
        if (tmp.constructor === Array) tmp = {};
        if (Object.keys(tmp).length > 0 && Object.keys(this.HeroDB).length) {
          for (var key in tmp) {
            if (!this.HeroDB[key] ) { // Check if heroes exist in the database
              if (this.HeroDB[tmp[key]._id]) { //convert to _id as key
                tmp[tmp[key]._id] = tmp[key];
                delete tmp[key];
              } else { // hero _id does not exist -> remove hero from user's roster to avoid boot problems
                delete tmp[key];
              };
            };
          };
        };
        this.myHeroesList = tmp;
        if (this.myHeroesList['dark-tyrant-tenebria']) delete this.myHeroesList['dark-tyrant-tenebria'];
        this.displayMyHeroes = Object.keys(this.myHeroesList);
        this.rosterLength = Object.keys(this.myHeroesList).length;
        //this.updateUserData(); // write data to local storage
      }, 
      getUserHeroesURL(e) {
        try {
          var roster = JSON.parse(atob(e));
          for (var i = 0; i < roster.length; i++) {
            if (this.HeroDB[roster[i]]) {
              this.myHeroesList[roster[i]] = this.HeroDB[roster[i]];
            };
          };
          if (this.myHeroesList['dark-tyrant-tenebria']) delete this.myHeroesList['dark-tyrant-tenebria'];
          this.displayMyHeroes = Object.keys(this.myHeroesList);
          this.rosterLength = Object.keys(this.myHeroesList).length;
          this.updateUserData();
        } catch (err) { // if URL is corrupted
          console.log("Error: corrupted URL");
          snackbarMessage("Error: corrupted URL roster!<br>Loading from local storage.");
          this.getUserHeroesBoot(); // get heroes list from file
        };
      },
      boot: function () {
        try {
          var urlParams = new URLSearchParams(window.location.search);
          $.ajax({
              url: "./HeroDatabase.json",
              type: 'GET',
              contentType: 'application/json',
              success: (response) => {
                this.HeroDB = response;
                this.sortedHeroDB = Object.keys(this.HeroDB).sort(function (a,b) {return ((a < b) ? -1 : ((a == b) ? 0: 1))});
                this.sortedHeroDB.splice(this.sortedHeroDB.indexOf("dark-tyrant-tenebria"), 1); // remove s tenebria's skin
                if (!urlParams.get("camproster")) { // get roster from file
                  this.getUserHeroesBoot();
                } else {// get roster from url
                  this.getUserHeroesURL(urlParams.get("camproster"));
                  window.history.pushState("", "", window.location.pathname); // remove ?camproster= from the URL to avoid accidental refreshes replacing your current team
                };
                this.filtroTuttiGliEroi({tipo:'refresh',casella:'',value:'',className: 'search_hero_filter', name: 'bodyLoad'},'AllHeroes');
                this.inizializzazione = false;
              },
              error: (jqXHR, textStatus, errorThrown) => {
                console.log("Can't download Hero Database!");
              }
          });
          this.impostaLingua();
          this.inizializzaione();
        } catch (err) {
          console.log(err);
          document.getElementById("caricamentoIniziale").innerHTML += "<span style='position: fixed; bottom: 0; right: 0; color: red; padding: 10px'><pre>FATAL ERROR<br>"+err+"<br><span style='color:green'>Please retry or contact me.</span></pre></span>";
        };
      },
      inizializzaione: function () {
        this.translatedName = {};
        self = this;
        $.ajax({
          url: "https://api.epicsevendb.com/hero?lang=" + this.lingua,
          type: 'GET',
          contentType: 'application/json',
          success: (response) => {
            response.results.forEach(function(item) {
              self.translatedName[item._id] = item.name;
            });
            let missing = {
              "dark-tyrant-tenebria": {cn: "残月的暴君泰妮布里雅", zht: "殘月的暴君泰妮布里雅", fr: "Tenebria tyran de l'astre violine"},
              "fairytale-tenebria": {jp: "メルヘン テネブレア", cn: "童话泰妮布里雅", zht: "童話泰妮布里雅", kr: "메르헨 테네브리아", fr: "Tenebria des merveilles", es: "Tenebria fantasia", pt: "Tenébria das Fábulas", de: "Märchenhafte Tenebria"},
              "mort": {cn: "魔勒", zht: "魔勒", kr: "모르트", fr: "Morté", es: "Mort", pt: "Mort", de: "Mort"}
            };
            for (var id in missing) {
              if (missing[id][this.lingua]) self.translatedName[id] = missing[id][this.lingua];
            };
            this.filtroTuttiGliEroi({tipo:'refresh',casella:'',value:'',className: 'search_hero_filter', name: 'bodyLoad'},'AllHeroes');
          },
          error: (jqXHR, textStatus, errorThrown) => {
            this.filtroTuttiGliEroi({tipo:'refresh',casella:'',value:'',className: 'search_hero_filter', name: 'bodyLoad'},'AllHeroes');
            snackbarMessage("Cannot connect to EpicSevenDB API. Using english gamedata.");
          }
        });
      }
    },
    computed: {
        computedGetSavedTeamsStats: function () {
          this.getSavedTeamsStats();
        },
        calcolaRisultati: function () { // in computed per evitare di calcolare 2 volte il risultato se non si è cambiato niente
            //resetta per un nuovo calcolo
            this.risultati = [];
            //Richiama questi valori per far capire a vue di ricalcolare se sono cambiati
            this.rosterLength;
            this.classe;
            this.elemento;
            this.debuffs;
            this.buffs;
            this.AoE;
            this.noS1debuffs;
            this.noDebuffs;
            this.mustIncludeDispel;
            this.customizedResuts;
            if (Object.keys(this.myHeroesList).length > 3) {
              this.isLoadingResults = true; // mostra animazione di caricamento

              var campList = Object.keys(this.myHeroesList);
              if (this.locked.length > 0 ) {
                for (var i = 0; i< this.locked.length; i++){
                    campList.splice( campList.indexOf(this.locked[i]),1);
                  };
              };
              try {
                camperino.postMessage({HeroDB: this.HeroDB, myHeroesList: this.myHeroesList, campList: campList, locked: this.locked, classe: this.classe, elemento: this.elemento, debuffs: this.debuffs, buffs: this.buffs, AoE: this.AoE, noS1debuffs: this.noS1debuffs, noDebuffs: this.noDebuffs, mustIncludeDispel: this.mustIncludeDispel, cartesianLock: this.cartesian_lock, preferenzeRisultati: this.customizedResuts, risultati: []});
                this.numeroCombinazioniPossibili = Combinatorics.bigCombination(campList,4-this.locked.length).length;
              } catch (err) {
                this.isLoadingResults = false; // remove angelica loading
                snackbarMessage(`Error: ` + err);
              };
            };
      }
  }, // computed
  watch: {
    risultati: function () { // when new results are calculated go back to page 1
      this.currentResultsPage = 1;
    },
    advancedIcons: function() {
      this.writeSettings();
    }
  },
  mounted () {
  },
  created () {console.log("CeciliaBot is booting..."), this.boot()}
});

function debounce(func, wait, immediate) {
  var timeout;
  return function executedFunction() {
    var context = this;
    var args = arguments;
	    
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
	
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
	
    if (callNow) func.apply(context, args);
  };
};


  var camperinoMessage = function (e) {
    //mandaNotificaCompletamento();
    if (e.data.error)
      mandaNotificaCompletamento(),
      snackbarMessage(app.strings["results_error"] + `: ` + app.strings[e.data.error]), /* throw error */
      document.getElementById('calculationPer').parentNode.style.display = "none",
      document.getElementById('calculationPer').style.width = "0%",
      app.isLoadingResults = false;
    else if (e.data.status) {
      document.getElementById('calculationPer').parentNode.style.display = "block";
      document.getElementById('calculationPer').previousElementSibling.innerText = e.data.status + "%";
      document.getElementById('calculationPer').style.width = e.data.status + "%";
    }
    else if (e.data.risultati)
      mandaNotificaCompletamento(),
      app.risultati = e.data.risultati,
      document.getElementById('calculationPer').parentNode.style.display = "none",
      document.getElementById('calculationPer').style.width = "0%",
      app.isLoadingResults = false;
  };
  // Genera un worker per eseguire i calcoli del camp
  var camperino = new Worker('./worker.js');
  camperino.onmessage = function(e) {
    camperinoMessage(e);
  };
  camperino.onerror = function(err) {
    console.log(err)
    snackbarMessage(`Camping fatal error. Please refresh this page.`)
    app.isLoadingResults = false;
  };
  function restartCamperino() { // abort calculation function
    var answer = window.confirm(app.strings.confirm_worker_termination);
    if (answer) { // terminate
      camperino.terminate();
      camperino = new Worker('./worker.js');
      var copy = app.debuffs.slice();
      app.debuffs.push("aaaa"); // add something to trigger a new calculation attempt 
      app.debuffs = copy; // restore debuff list
      app.isLoadingResults = false; // disattiva angelica
      document.getElementById('calculationPer').parentNode.style.display = "none",
      camperino.onmessage = function(e) {
        camperinoMessage(e);
      };
      camperino.onerror = function(err) {
        console.log(err);
        snackbarMessage(`Camping fatal error. Please refresh this page.`);
        app.isLoadingResults = false;
      };
    };
  };
  /*
  window.onerror = function (message, file, line, col, error) {
   snackbarMessage("ERROR<br>"+error.message + "<br>"+file+" "+line+":"+col);
   return false;
  };
  */
  window.addEventListener("error", function (e) {
    if (e.error && e.error.message.indexOf("e.target.parentNode")===-1) snackbarMessage("ERROR<br>"+e.message + "<br>"+e.error.fileName+" "+e.error.lineNumber+":"+e.error.columnNumber);
    return false;
  });