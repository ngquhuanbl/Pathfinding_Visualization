(this["webpackJsonppathfinding-visualizer"]=this["webpackJsonppathfinding-visualizer"]||[]).push([[0],{88:function(e,t,n){},96:function(e,t,n){"use strict";n.r(t);var r,a,i,c,l,o=n(0),s=n.n(o),u=n(118),b=n(72),h=n.n(b),d=(n(88),n(62)),j=n.n(d),f=n(73),O=n(3),v=n(4),m=n(113),g=n(119),x=n(111),w=n(63),p=n.n(w),k=n(9),E=n.n(k),C={RECURSIVE_DIVISION_EQUAL:{label:"Recursive equal division",execute:function(e,t,n,r,a){return function e(t,n,r,a,i,c,l,o,s){if(o-c<=1||s-l<=1)return t;var u=t,b=Math.round(.5*(o-c))+c;b===c&&(b+=1);var h=Math.round(.5*(s-l))+l;h===l&&(h+=1);for(var d=c;d<=o;d+=1)d===c&&0!==c&&!u[d-1][h].isWall||d===o&&o!==t.length-1&&!u[d+1][h].isWall||d===n&&h===r||d===a&&h===i||(u=E()(u,Object(O.a)({},d,Object(O.a)({},h,{isWall:{$set:!0}}))));for(var j=l;j<=s;j+=1)j===l&&0!==l&&!u[b][j-1].isWall||j===s&&s!==t[0].length-1&&!u[b][j+1].isWall||b===n&&j===r||b===a&&j===i||(u=E()(u,Object(O.a)({},b,Object(O.a)({},j,{isWall:{$set:!0}}))));var f=Math.round(3*Math.random());return[{min:c,max:b-1,isVerticalWall:!0},{min:l,max:h-1,isVerticalWall:!1},{min:b+1,max:o,isVerticalWall:!0},{min:h+1,max:s,isVerticalWall:!1}].forEach((function(e,t){var n=e.min,r=e.max,a=e.isVerticalWall;if(t!==f&&!(n>r)){var i=Math.round(Math.random()*(r-n))+n,c=-1,l=-1;a?(c=i,l=h):(c=b,l=i),u=E()(u,Object(O.a)({},c,Object(O.a)({},l,{isWall:{$set:!1}})))}})),u=e(u,n,r,a,i,c,l,b-1,h-1),u=e(u,n,r,a,i,b+1,l,o,h-1),u=e(u,n,r,a,i,b+1,h+1,o,s),u=e(u,n,r,a,i,c,h+1,b-1,s)}(e,t,n,r,a,0,0,e.length-1,e[0].length-1)}},RECURSIVE_DIVISION_NON_EQUAL:{label:"Recursive non-equal division",execute:function(e,t,n,r,a){return function e(t,n,r,a,i,c,l,o,s){if(o-c<=1||s-l<=1)return t;var u=t,b=Math.round(Math.random()*(o-c))+c;b===c&&(b+=1);var h=Math.round(Math.random()*(s-l))+l;h===l&&(h+=1);for(var d=c;d<=o;d+=1)d===c&&0!==c&&!u[d-1][h].isWall||d===o&&o!==t.length-1&&!u[d+1][h].isWall||d===n&&h===r||d===a&&h===i||(u=E()(u,Object(O.a)({},d,Object(O.a)({},h,{isWall:{$set:!0}}))));for(var j=l;j<=s;j+=1)j===l&&0!==l&&!u[b][j-1].isWall||j===s&&s!==t[0].length-1&&!u[b][j+1].isWall||b===n&&j===r||b===a&&j===i||(u=E()(u,Object(O.a)({},b,Object(O.a)({},j,{isWall:{$set:!0}}))));var f=Math.round(3*Math.random());return[{min:c,max:b-1,isVerticalWall:!0},{min:l,max:h-1,isVerticalWall:!1},{min:b+1,max:o,isVerticalWall:!0},{min:h+1,max:s,isVerticalWall:!1}].forEach((function(e,t){var n=e.min,r=e.max,a=e.isVerticalWall;if(t!==f&&!(n>r)){var i=Math.round(Math.random()*(r-n))+n,c=-1,l=-1;a?(c=i,l=h):(c=b,l=i),u=E()(u,Object(O.a)({},c,Object(O.a)({},l,{isWall:{$set:!1}})))}})),u=e(u,n,r,a,i,c,l,b-1,h-1),u=e(u,n,r,a,i,b+1,l,o,h-1),u=e(u,n,r,a,i,b+1,h+1,o,s),u=e(u,n,r,a,i,c,h+1,b-1,s)}(e,t,n,r,a,0,0,e.length-1,e[0].length-1)}},BASIC_RANDOM_WALL:{label:"Basic wall random",execute:function(e,t,n,r,a){for(var i=e,c=e.length,l=e[0].length,o=0;o<c;o+=1)for(var s=0;s<l;s+=1)if((o!==t||s!==n)&&(o!==r||s!==a)){var u=Math.random()<.25;u&&(i=E()(i,Object(O.a)({},o,Object(O.a)({},s,{isWall:{$set:u}}))))}return i}},BASIC_RANDOM_DESERT:{label:"Basic desert random",execute:function(e,t,n,r,a){for(var i=e,c=e.length,l=e[0].length,o=0;o<c;o+=1)for(var s=0;s<l;s+=1)if((o!==t||s!==n)&&(o!==r||s!==a)){var u=Math.random()<.35;u&&(i=E()(i,Object(O.a)({},o,Object(O.a)({},s,{isDesert:{$set:u}}))))}return i}}},y=n(28),S=n(21),I=function e(t){Object(S.a)(this,e),this.value=void 0,this.next=void 0,this.value=t,this.next=null},M=function(){function e(){Object(S.a)(this,e),this.head=void 0,this.tail=void 0,this.head=null,this.tail=null}return Object(y.a)(e,[{key:"isEmpty",value:function(){return null===this.head}},{key:"enqueue",value:function(e){var t=new I(e);if(this.isEmpty())return this.head=t,void(this.tail=t);this.tail.next=t,this.tail=t}},{key:"dequeue",value:function(){if(this.isEmpty())return null;var e=this.head.value;return this.head===this.tail?(this.head=null,this.tail=null):this.head=this.head.next,e}},{key:"traverse",value:function(){for(var e=[],t=this.head;t;){var n=t.value;e.push(n),t=t.next}return e}}]),e}(),A=[{row:0,col:1},{row:0,col:-1},{row:1,col:0},{row:-1,col:0}],W=function(e,t){var n=e.length,r=e[0].length,a=[];return A.forEach((function(i){var c,l=t.row+i.row,o=t.col+i.col,s=null===(c=e[l])||void 0===c?void 0:c[o];(function(e,t,n){if(!e)return!1;var r=e.row,a=e.col;return r>=0&&r<t&&a>=0&&a<n})(s,n,r)&&function(e){return!e.isWall}(s)&&a.push(s)})),(t.row+t.col)%2===0&&a.reverse(),a},D=function(e,t){var n=0;return e.isDesert&&(n+=2.5),t.isDesert&&(n+=2.5),0===n?1:n},V=function(e,t,n,r,a,i){var c=new M,l=new Map,o=e[t][n];c.enqueue(o),l.set(o,null);for(var s=function(){var t=c.dequeue();i&&i(t),W(e,t).forEach((function(e){l.has(e)||(l.set(e,t),c.enqueue(e))}))};!c.isEmpty();)s();return l},R=function(e,t,n,r,a,i){var c=new M,l=new Map,o=e[t][n],s=e[r][a];c.enqueue(o),l.set(o,null);for(var u=function(){var t=c.dequeue();if(i&&i(t),t.equal(s))return"break";W(e,t).forEach((function(e){l.has(e)||(l.set(e,t),c.enqueue(e))}))};!c.isEmpty();){if("break"===u())break}return l},z=function e(t,n){Object(S.a)(this,e),this.value=void 0,this.priority=void 0,this.next=void 0,this.value=t,this.priority=n,this.next=null},_=function(){function e(){Object(S.a)(this,e),this.head=void 0,this.tail=void 0,this.head=null,this.tail=null}return Object(y.a)(e,[{key:"isEmpty",value:function(){return null===this.head}},{key:"enqueue",value:function(e,t){var n=new z(e,t);if(this.isEmpty())return this.head=n,void(this.tail=n);for(var r=null,a=this.head;null!==a;){if(a.priority>t)return null!==r?r.next=n:this.head=n,void(n.next=a);r=a,a=a.next}this.tail.next=n,this.tail=n}},{key:"dequeue",value:function(){if(this.isEmpty())return null;var e=this.head.value;return this.head=this.head.next,null===this.head&&(this.tail=null),e}},{key:"traverse",value:function(){for(var e=[],t=this.head;t;){var n=t.value;e.push(n),t=t.next}return e}}]),e}(),P={BFS:{label:"BFS",execute:V},EARLY_EXIT_BFS:{label:"Early Exit BFS",execute:R},DIJKSTRA:{label:"Dijkstra",execute:function(e,t,n,r,a,i){var c=new _,l=new Map,o=new Map,s=e[t][n],u=e[r][a];c.enqueue(s,0),l.set(s,null),o.set(s,0);for(var b=function(){var t=c.dequeue();if(i&&i(t),t.equal(u))return"break";W(e,t).forEach((function(e){var n=o.get(t)+D(t,e);(!o.has(e)||n<o.get(e))&&(o.set(e,n),c.enqueue(e,n),l.set(e,t))}))};!c.isEmpty();){if("break"===b())break}return l}},GREEDY_BEST_FIRST_SEARCH:{label:"Greedy Best First Search",execute:function(e,t,n,r,a,i){var c=new _,l=new Map,o=e[t][n],s=e[r][a];c.enqueue(o,0),l.set(o,null);for(var u=function(){var t=c.dequeue();if(i&&i(t),t.equal(s))return"break";W(e,t).forEach((function(e){if(!l.has(e)){var n=(r=e,a=s,Math.abs(r.row-a.row)+Math.abs(r.col-a.col));c.enqueue(e,n),l.set(e,t)}var r,a}))};!c.isEmpty();){if("break"===u())break}return l}},A_STAR:{label:"A *",execute:function(e,t,n,r,a,i){var c=new _,l=new Map,o=new Map,s=e[t][n],u=e[r][a];c.enqueue(s,0),l.set(s,null),o.set(s,0);for(var b=function(){var t=c.dequeue();if(i&&i(t),t.equal(u))return"break";W(e,t).forEach((function(e){var n,r,a=o.get(t)+D(t,e);if(!o.has(e)||a<o.get(e)){var i=(n=e,r=u,Math.abs(n.row-r.row)+Math.abs(n.col-r.col)+a);o.set(e,a),c.enqueue(e,i),l.set(e,t)}}))};!c.isEmpty();){if("break"===b())break}return l}}},q="DRAWING_ACTION_ADD_ITEM",L="DRAWING_ITEM_WALL",T="DRAWING_ITEM_DESERT",$=function(){function e(t,n,r,a,i,c,l,o){Object(S.a)(this,e),this.row=void 0,this.col=void 0,this.isWall=void 0,this.isDesert=void 0,this.isVisited=void 0,this.isPathStep=void 0,this.isStart=void 0,this.isEnd=void 0,this.noAnimation=void 0,this.row=t,this.col=n,this.isWall=r,this.isDesert=a,this.isVisited=i,this.isPathStep=c,this.isStart=l,this.isEnd=o,this.noAnimation=!1}return Object(y.a)(e,[{key:"equal",value:function(e){return this.row===e.row&&this.col===e.col}}]),e}(),B=function(e){return 100*(1-e/100)},F=function(e,t,n,r,a,i){var c=t[n][r],l=t[a][i],o=e.get(l);if(!o)return[];for(var s=[l];o&&!o.equal(c);)s.push(o),o=e.get(o);return s.push(c),s.reverse(),s},N=n(74),U=n(112),G=n(106),H=n(107),J=n(120),Q=n(116),Y=n(117),K=n(2),X=function(e){var t=e.selectedDrawingItem,n=e.onSelectDrawingItem,r=e.onSpeedChange,a=e.isVirtualizing,i=e.selectedMazePattern,c=e.onSelectMazePattern,l=e.onApplyMazePattern,s=Object(o.useMemo)((function(){return Object.entries(C).map((function(e){var t=Object(v.a)(e,2),n=t[0],r=t[1].label;return Object(K.jsx)("option",{value:n,children:r},n)}))}),[]);return Object(K.jsxs)(G.a,{templateAreas:["'drawingItemLabel' 'drawingItemInput' 'speedLabel' 'speedInput' 'mazeLabel' 'mazeInput'","'drawingItemLabel drawingItemInput drawingItemInput' 'speedLabel speedInput speedInput' 'mazeLabel mazeInput mazeInput'"],rowGap:4,columnGap:[0,4],alignItems:"center",textAlign:["center","left"],w:["full","unset"],children:[Object(K.jsx)(G.b,{gridArea:"drawingItemLabel",children:Object(K.jsx)(H.a,{fontWeight:"600",children:"Drawing item:"})}),Object(K.jsx)(G.b,{gridArea:"drawingItemInput",children:Object(K.jsxs)(g.a,{children:[Object(K.jsxs)(J.a,{w:["full",60],value:t,disabled:a,onChange:n,children:[Object(K.jsx)("option",{value:L,children:"Wall"}),Object(K.jsx)("option",{value:T,children:"Desert"})]}),Object(K.jsx)(x.a,{ml:2,w:4,h:4,flexShrink:0,borderWidth:"1px",bgColor:"DRAWING_ITEM_WALL"===t?"gray.800":"orange.400",borderColor:"DRAWING_ITEM_WALL"===t?"gray.700":"orange.300"})]})}),Object(K.jsx)(G.b,{gridArea:"speedLabel",children:Object(K.jsx)(H.a,{fontWeight:"600",children:"Speed:"})}),Object(K.jsx)(G.b,{gridArea:"speedInput",children:Object(K.jsxs)(Q.a,{colorScheme:"cyan","aria-label":"speed slider",width:"full",min:0,max:100,defaultValue:50,onChange:r,children:[Object(K.jsx)(Q.d,{children:Object(K.jsx)(Q.b,{})}),Object(K.jsx)(Q.c,{boxSize:6})]})}),Object(K.jsx)(G.b,{gridArea:"mazeLabel",children:Object(K.jsx)(H.a,{fontWeight:"600",children:"Maze pattern:"})}),Object(K.jsx)(G.b,{gridArea:"mazeInput",children:Object(K.jsxs)(g.b,{direction:["column","row"],children:[Object(K.jsx)(J.a,{w:["full",60],value:i,disabled:a,onChange:c,children:s}),Object(K.jsx)(Y.a,{colorScheme:"gray",onClick:l,children:"Apply"})]})})]})},Z=Object(o.memo)(X),ee=function(){return Object(K.jsxs)(G.a,{autoRows:"40px",templateAreas:["'start visited path' 'end desertVisited desertPath' 'wall . .' 'desert . .'","'start end wall desert' '. . visited desertVisited' '. . path desertPath'"],gap:4,alignItems:"center",children:[Object(K.jsx)(G.b,{gridArea:"start",children:Object(K.jsxs)(g.a,{children:[Object(K.jsx)(x.a,{w:4,h:4,borderWidth:"1px",bgColor:"red.400",borderColor:"red.300",flexShrink:0}),Object(K.jsx)(H.a,{children:"Start"})]})}),Object(K.jsx)(G.b,{gridArea:"end",children:Object(K.jsxs)(g.a,{children:[Object(K.jsx)(x.a,{w:4,h:4,borderWidth:"1px",bgColor:"green.400",borderColor:"green.300",flexShrink:0}),Object(K.jsx)(H.a,{children:"End"})]})}),Object(K.jsx)(G.b,{gridArea:"wall",children:Object(K.jsxs)(g.a,{children:[Object(K.jsx)(x.a,{w:4,h:4,borderWidth:"1px",bgColor:"gray.800",borderColor:"gray.700",flexShrink:0}),Object(K.jsx)(H.a,{children:"Wall"})]})}),Object(K.jsx)(G.b,{gridArea:"desert",children:Object(K.jsxs)(g.a,{children:[Object(K.jsx)(x.a,{w:4,h:4,borderWidth:"1px",bgColor:"orange.400",borderColor:"orange.300",flexShrink:0}),Object(K.jsx)(H.a,{children:"Desert"})]})}),Object(K.jsx)(G.b,{gridArea:"visited",children:Object(K.jsxs)(g.a,{children:[Object(K.jsx)(x.a,{w:4,h:4,borderWidth:"1px",bgColor:"blue.300",borderColor:"blue.200",flexShrink:0}),Object(K.jsx)(H.a,{children:"Visited"})]})}),Object(K.jsx)(G.b,{gridArea:"desertVisited",children:Object(K.jsxs)(g.a,{children:[Object(K.jsx)(x.a,{w:4,h:4,borderWidth:"1px",bgColor:"orange.500",borderColor:"orange.400",flexShrink:0}),Object(K.jsx)(H.a,{children:"Visited desert"})]})}),Object(K.jsx)(G.b,{gridArea:"path",children:Object(K.jsxs)(g.a,{children:[Object(K.jsx)(x.a,{w:4,h:4,borderWidth:"1px",bgColor:"yellow.300",borderColor:"yellow.200",flexShrink:0}),Object(K.jsx)(H.a,{children:"Path"})]})}),Object(K.jsx)(G.b,{gridArea:"desertPath",children:Object(K.jsxs)(g.a,{children:[Object(K.jsx)(x.a,{w:4,h:4,borderWidth:"1px",bgColor:"yellow.500",borderColor:"yellow.400",flexShrink:0}),Object(K.jsx)(H.a,{children:"Path through desert"})]})})]})},te=Object(o.memo)(ee),ne=function(e){return Object(K.jsxs)(g.b,{w:"full",direction:["column","column","column","column","row"],alignItems:["center","center","center","center","flex-start"],children:[Object(K.jsx)(Z,Object(N.a)({},e)),Object(K.jsx)(U.a,{paddingLeft:8,paddingRight:8}),Object(K.jsx)(te,{})]})},re=n(30),ae=n(23),ie=Object(ae.b)(r||(r=Object(re.a)(["\n  0% {\n    transform: scale(0.3);\n    background-color: var(--chakra-colors-purple-400);\n    border-radius: 50%;\n  }\n\n  50% {\n    background-color: var(--chakra-colors-cyan-500);\n  }\n\n  75% {\n    transform: scale(1.2);\n    background-color: var(--chakra-colors-blue-600);\n  }\n\n  100% {\n    transform: scale(1);\n    background-color: var(--chakra-colors-blue-300);\n  }\n"]))),ce=Object(ae.b)(a||(a=Object(re.a)(["\n  0% {\n    transform: scale(0.3);\n    background-color: var(--chakra-colors-purple-400);\n    border-radius: 50%;\n  }\n\n  50% {\n    background-color: var(--chakra-colors-cyan-500);\n  }\n\n  75% {\n    transform: scale(1.2);\n    background-color: var(--chakra-colors-blue-600);\n  }\n\n  100% {\n    transform: scale(1);\n    background-color: var(--chakra-colors-orange-500);\n    border-color: var(--chakra-colors-orange-400);\n  }\n"]))),le=Object(ae.b)(i||(i=Object(re.a)(["\n  0% {\n    transform: scale(1);\n  }\n\n  75% {\n    transform: scale(1.5);\n  }\n\n  100% {\n    transform: scale(1);\n  }\n"]))),oe=Object(ae.b)(c||(c=Object(re.a)(["\n  0% {\n    transform: scale(0.6);\n    background-color: var(--chakra-colors-yellow-100);\n  }\n\n  50% {\n    transform: scale(1.2);\n    background-color: var(--chakra-colors-yellow-200);\n  }\n\n  100% {\n    transform: scale(1);\n    background-color: var(--chakra-colors-yellow-300);\n    border-color: var(--chakra-colors-yellow-200);\n  }\n"]))),se=Object(ae.b)(l||(l=Object(re.a)(["\n  0% {\n    transform: scale(0.6);\n    background-color: var(--chakra-colors-yellow-100);\n  }\n\n  50% {\n    transform: scale(1.2);\n    background-color: var(--chakra-colors-yellow-200);\n  }\n\n  100% {\n    transform: scale(1);\n    background-color: var(--chakra-colors-yellow-500);\n    border-color: var(--chakra-colors-yellow-400);\n  }\n"]))),ue=function(e){var t,n=e.row,r=e.col,a=e.isVisited,i=e.isPathStep,c=e.isStart,l=e.isEnd,s=e.isWall,u=e.isDesert,b=e.noAnimation,h=e.onMouseDown,d=e.onMouseEnter,j=e.onMouseUp,f="blue.200",O="white";c?(f="red.400",O="red.300"):l?(f="green.400",O="green.300"):s?(f="gray.800",O="gray.700"):u&&(f="orange.400",O="orange.300"),a&&(t="".concat(u?ce:ie," 1 1.5s ease-out alternate forwards")),i&&(t="".concat(oe," 1 1.5s ease-out alternate forwards"),u&&(t="".concat(se," 1 1.5s ease-out alternate forwards"))),(a||i)&&(c||l)&&(t="".concat(le," 1 1.5s ease-out alternate forwards")),b&&(t="",!a||c||l||(O="blue.300",f="blue.200",u?(O="orange.500",f="orange.400"):s&&(f="gray.800",O="gray.700")),!i||c||l||(O="yellow.300",f="yellow.200",u?(O="yellow.500",f="yellow.400"):s&&(f="gray.800",O="gray.700")));var v=Object(o.useCallback)((function(){h(n,r,c,l,s,u)}),[n,r,c,l,s,u,h]),m=Object(o.useCallback)((function(){d(n,r,c,l,s,u)}),[n,r,c,l,s,u,d]),g=Object(o.useCallback)((function(){j(n,r)}),[n,r,j]);return Object(K.jsx)(x.a,{border:"1px",userSelect:"none",borderColor:f,w:6,h:6,display:"inline-flex",justifyContent:"center",alignItems:"center",bgColor:O,animation:t,onMouseDown:v,onMouseEnter:m,onMouseUp:g})},be=Object(o.memo)(ue),he=function(e){var t=e.isVirtualizing,n=e.data,r=e.onMouseDownOnCell,a=e.onMouseEnterOnCell,i=e.onMouseUpOnCell,c=Object(o.useCallback)((function(e){t&&e.stopPropagation()}),[t]);return Object(K.jsx)(x.a,{cursor:t?"not-allowed":"",onMouseDownCapture:c,children:n.map((function(e,t){return Object(K.jsx)(m.a,{children:e.map((function(e){var t=e.row,n=e.col,c=e.isVisited,l=e.isPathStep,o=e.isStart,s=e.isEnd,u=e.isWall,b=e.isDesert,h=e.noAnimation;return Object(K.jsx)(be,{row:t,col:n,isVisited:c,isPathStep:l,isStart:o,isEnd:s,isDesert:b,isWall:u,noAnimation:h,onMouseDown:r,onMouseEnter:a,onMouseUp:i},"".concat(t,"-").concat(n))}))},"row-".concat(t))}))})},de=n(114),je=n(115);function fe(){return(fe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function Oe(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var ve=o.createElement("rect",{width:32,height:32,fill:"#63B3ED"}),me=o.createElement("rect",{x:16,width:16,height:16,fill:"#68D391"}),ge=o.createElement("rect",{y:16,width:16,height:16,fill:"#FC8181"}),xe=o.createElement("rect",{x:16,y:16,width:8,height:8,fill:"#F6E05E"}),we=o.createElement("rect",{x:16,y:16,width:16,height:16,fill:"#F6E05E"}),pe=o.createElement("rect",{width:8,height:8,fill:"#1A202C"}),ke=o.createElement("rect",{x:24,y:24,width:8,height:8,fill:"#F6AD55"});function Ee(e,t){var n=e.title,r=e.titleId,a=Oe(e,["title","titleId"]);return o.createElement("svg",fe({width:32,height:32,viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":r},a),n?o.createElement("title",{id:r},n):null,ve,me,ge,xe,we,pe,ke)}var Ce,ye=o.forwardRef(Ee),Se=(n.p,Object(ae.b)(Ce||(Ce=Object(re.a)(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"])))),Ie=function(e){var t=e.isVirtualizing,n=t?"".concat(Se," infinite 0.5s linear"):"",r=Object(o.useMemo)((function(){return t?{borderRadius:"50%"}:{}}),[t]);return Object(K.jsx)(x.a,{mr:3,children:Object(K.jsx)(x.a,{animation:n,children:Object(K.jsx)(ye,{style:r})})})},Me=function(e){var t=e.selectedAlgorithm,n=e.onSelectedAlgorithmChange,r=e.isVirtualizing,a=e.onStartVirtualization,i=e.onDone,c=e.onClearVirtualizationResults,l=e.onClearAll,s=Object(o.useMemo)((function(){return Object.entries(P).map((function(e){var t=Object(v.a)(e,2),n=t[0];return{label:t[1].label,value:n}}))}),[]);return Object(K.jsxs)(g.b,{direction:["column","column","column","column","row"],alignItems:["center","center","center","center"],children:[Object(K.jsx)(Ie,{isVirtualizing:r}),Object(K.jsxs)(g.b,{direction:["column","column","row","row","row"],alignItems:"center",w:["full","full","unset"],children:[Object(K.jsx)(H.a,{fontWeight:"600",children:"Algorithm:"}),Object(K.jsx)(J.a,{w:["full","full",60],value:t,disabled:r,onChange:n,children:s.map((function(e){var t=e.value,n=e.label;return Object(K.jsx)("option",{value:t,children:n},t)}))}),Object(K.jsx)(Y.a,{colorScheme:"teal",onClick:a,disabled:r,w:["full","full","unset"],children:"Virtualize algorithm"}),r&&Object(K.jsx)(Y.a,{colorScheme:"green",leftIcon:Object(K.jsx)(de.a,{}),onClick:i,w:["full","full","unset"],children:"Done"})]}),Object(K.jsx)(U.a,{}),Object(K.jsxs)(g.b,{direction:["column","column","row","row","row"],w:["full","full","unset"],children:[Object(K.jsx)(Y.a,{leftIcon:Object(K.jsx)(je.a,{}),colorScheme:"purple",onClick:c,children:"Clear virtualization results"}),Object(K.jsxs)(Y.a,{leftIcon:Object(K.jsx)(je.a,{}),colorScheme:"red",onClick:l,children:[Object(K.jsx)(H.a,{display:["none","block"],children:"Clear virtualization results + walls + desert"}),Object(K.jsx)(H.a,{display:["block","none"],children:"Clear all"})]})]})]})},Ae=Object(o.memo)(Me),We=function(){var e=Object(o.useState)([]),t=Object(v.a)(e,2),n=t[0],r=t[1],a=Object(o.useState)(-1),i=Object(v.a)(a,2),c=i[0],l=i[1],s=Object(o.useState)(-1),u=Object(v.a)(s,2),b=u[0],h=u[1],d=Object(o.useState)(-1),w=Object(v.a)(d,2),k=w[0],y=w[1],S=Object(o.useState)(-1),I=Object(v.a)(S,2),M=I[0],A=I[1],W=Object(o.useCallback)((function(){var e=document.documentElement.clientWidth,t=document.documentElement.clientHeight,n=document.getElementById("header").clientHeight,a=document.getElementById("footer").clientHeight,i=e-64,c=Math.max(t-64-n-a-64,480),o=Math.round(c/24),s=Math.round(i/24),u=Math.floor(o/2),b=Math.floor(s/3),d=u,j=s-b-1;l(u),h(b),y(d),A(j),r(Array.from({length:o},(function(e,t){return Array.from({length:s},(function(e,n){return new $(t,n,!1,!1,!1,!1,t===u&&n===b,t===d&&n===j)}))})))}),[]);Object(o.useEffect)((function(){W()}),[W]);var D=Object(o.useState)(!1),V=Object(v.a)(D,2),R=V[0],z=V[1],_=Object(o.useRef)(!1),N=Object(o.useRef)(null),U=Object(o.useState)("BFS"),G=Object(v.a)(U,2),H=G[0],J=G[1],Q=Object(o.useCallback)((function(e){J(e.currentTarget.value)}),[]),Y=Object(o.useRef)(!1),X=Object(o.useRef)(!1),Z=Object(o.useRef)(!1),ee=Object(o.useState)(q),te=Object(v.a)(ee,2),re=te[0],ae=te[1],ie=Object(o.useState)(L),ce=Object(v.a)(ie,2),le=ce[0],oe=ce[1],se=Object(o.useRef)(B(50)),ue=Object(o.useCallback)((function(e){oe(e.currentTarget.value)}),[]),be=Object(o.useCallback)((function(e){se.current=B(e)}),[]),de=Object(o.useCallback)((function(e,t,n,a,i){a||i||l((function(n){return h((function(a){return r((function(r){return E()(r,p()(Object(O.a)({},n,Object(O.a)({},a,{isStart:{$set:!1}})),Object(O.a)({},e,Object(O.a)({},t,{isStart:{$set:!0}}))))})),t})),e}))}),[]),je=Object(o.useCallback)((function(e,t,n,a,i){n||i||y((function(n){return A((function(a){return r((function(r){return E()(r,p()(Object(O.a)({},n,Object(O.a)({},a,{isEnd:{$set:!1}})),Object(O.a)({},e,Object(O.a)({},t,{isEnd:{$set:!0}}))))})),t})),e}))}),[]),fe=Object(o.useCallback)((function(e,t,n,a,i,c,l){if(!n&&!a){if(le===L&&c)return;if(le===T&&i)return;var o=l===q;r(le===L?function(n){return E()(n,Object(O.a)({},e,Object(O.a)({},t,{isWall:{$set:o},isVisited:{$set:!1},isPathStep:{$set:!1}})))}:function(n){return E()(n,Object(O.a)({},e,Object(O.a)({},t,{isDesert:{$set:o}})))})}}),[le]),Oe=Object(o.useCallback)((function(e,t,n,r,a,i){if(n)Y.current=!0;else if(r)X.current=!0;else{Z.current=!0;var c=q;(le===T&&i||le===L&&a)&&(c="DRAWING_ACTION_REMOVE_ITEM"),ae(c),fe(e,t,n,r,a,i,c)}}),[fe,le]),ve=Object(o.useCallback)((function(e,t,n,r,a,i){Y.current?de(e,t,n,r,a):X.current?je(e,t,n,r,a):Z.current&&fe(e,t,n,r,a,i,re)}),[de,je,fe,re]),me=Object(o.useCallback)((function(){Y.current=!1,X.current=!1,Z.current=!1}),[]),ge=Object(o.useCallback)((function(e){return new Promise((function(t){!function e(n,a,i){var c=n.length;if(a!==c)return _.current?(r((function(e){for(var t=E()(e,{}),r=a;r<c;){var i=n[r],l=i.row,o=i.col;t=E()(t,Object(O.a)({},l,Object(O.a)({},o,{isVisited:{$set:!0},noAnimation:{$set:!0}}))),r+=1}return t})),void t()):void(N.current=setTimeout((function(){var t=n[a],c=t.row,l=t.col;r((function(e){return E()(e,Object(O.a)({},c,Object(O.a)({},l,{isVisited:{$set:!0}})))})),e(n,a+1,i)}),se.current));i()}(e,0,t)}))}),[]),xe=Object(o.useCallback)((function(e){return new Promise((function(t){0===e.length&&t(),function e(n,a,i){var c=n.length;if(a!==n.length)return _.current?(r((function(e){for(var t=E()(e,{}),r=a;r<c;){var i=n[r],l=i.row,o=i.col;t=E()(t,Object(O.a)({},l,Object(O.a)({},o,{isPathStep:{$set:!0},noAnimation:{$set:!0}}))),r+=1}return t})),void t()):void(N.current=setTimeout((function(){var t=n[a],c=t.row,l=t.col;r((function(e){return E()(e,Object(O.a)({},c,Object(O.a)({},l,{isPathStep:{$set:!0}})))})),e(n,a+1,i)}),se.current));i()}(e,0,t)}))}),[]),we=Object(o.useCallback)((function(){null!==N.current&&(clearTimeout(N.current),N.current=null),z(!1),_.current=!1}),[]),pe=Object(o.useCallback)((function(){we(),r((function(e){return e.map((function(e){return e.map((function(e){var t=e.row,n=e.col,r=e.isWall,a=e.isDesert,i=e.isStart,c=e.isEnd;return new $(t,n,r,a,!1,!1,i,c)}))}))}))}),[we]),ke=Object(o.useCallback)((function(){we(),r((function(e){return e.map((function(e){return e.map((function(e){var t=e.row,n=e.col,r=e.isStart,a=e.isEnd;return new $(t,n,!1,!1,!1,!1,r,a)}))}))}))}),[we]),Ee=function(){var e=Object(f.a)(j.a.mark((function e(){var t,r,a,i;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return pe(),z(!0),t=[],r=P[H].execute,a=r(n,c,b,k,M,(function(e){t.push(e)})),e.next=7,ge(t);case 7:return i=F(a,n,c,b,k,M),e.next=10,xe(i);case 10:z(!1),_.current=!0;case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ce=Object(o.useCallback)((function(e,t,n,a){r((function(r){var i=[],c=P[H].execute,l=r.map((function(e){return e.map((function(e){var t=e.row,n=e.col,r=e.isWall,a=e.isDesert,i=e.isStart,c=e.isEnd;return new $(t,n,r,a,!1,!1,i,c)}))})),o=c(l,e,t,n,a,(function(e){i.push(e)})),s=F(o,l,e,t,n,a);return i.forEach((function(e){var t=e.row,n=e.col;l[t][n].isVisited=!0,l[t][n].noAnimation=!0})),s.forEach((function(e){var t=e.row,n=e.col;l[t][n].isPathStep=!0})),l}))}),[H]);Object(o.useEffect)((function(){_.current&&Ce(c,b,k,M)}),[c,b,k,M,Ce]);var ye=Object(o.useCallback)((function(){we(),W()}),[we,W]);Object(o.useEffect)((function(){return window.addEventListener("resize",ye),function(){window.removeEventListener("resize",ye)}}),[ye]);var Se=Object(o.useCallback)((function(){_.current=!0}),[]),Ie=Object(o.useState)("RECURSIVE_DIVISION_EQUAL"),Me=Object(v.a)(Ie,2),We=Me[0],De=Me[1],Ve=Object(o.useCallback)((function(e){De(e.currentTarget.value)}),[]),Re=Object(o.useCallback)((function(){ke(),r((function(e){return C[We].execute(e,c,b,k,M)}))}),[ke,We,c,b,k,M]);return Object(K.jsx)(m.a,{minHeight:"100vh",alignItems:"center",justifyContent:"center",padding:8,children:Object(K.jsxs)(g.c,{spacing:6,children:[Object(K.jsx)(x.a,{w:"full",id:"header",children:Object(K.jsx)(Ae,{selectedAlgorithm:H,onSelectedAlgorithmChange:Q,isVirtualizing:R,onStartVirtualization:Ee,onDone:Se,onClearVirtualizationResults:pe,onClearAll:ke})}),Object(K.jsx)(he,{isVirtualizing:R,data:n,onMouseDownOnCell:Oe,onMouseEnterOnCell:ve,onMouseUpOnCell:me}),Object(K.jsx)(x.a,{w:"full",id:"footer",children:Object(K.jsx)(ne,{selectedDrawingItem:le,onSelectDrawingItem:ue,isVirtualizing:R,onSpeedChange:be,selectedMazePattern:We,onSelectMazePattern:Ve,onApplyMazePattern:Re})})]})})};var De=function(){return Object(K.jsx)(We,{})},Ve=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,121)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),r(e),a(e),i(e),c(e)}))};h.a.render(Object(K.jsx)(s.a.StrictMode,{children:Object(K.jsx)(u.a,{children:Object(K.jsx)(De,{})})}),document.getElementById("root")),Ve()}},[[96,1,2]]]);
//# sourceMappingURL=main.592495d3.chunk.js.map