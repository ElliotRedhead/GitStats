(this.webpackJsonpgitstat=this.webpackJsonpgitstat||[]).push([[0],{55:function(e,t,n){e.exports=n(66)},60:function(e,t,n){},66:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(7),l=n(41),i=n(9),o=n(44),m=n(27),s=n(94),u=n(98),h=n(99),p=n(100),g=n(101),f=n(102),E=(n(60),function(){var e=Object(a.useState)("ElliotRedhead"),t=Object(m.a)(e,2),n=t[0],r=t[1],l=Object(a.useState)(),i=Object(m.a)(l,2),E=i[0],d=i[1],b=Object(a.useState)(""),v=Object(m.a)(b,2),j=v[0],y=v[1],x=Object(a.useState)(),O=Object(m.a)(x,2),k=O[0],C=O[1],F=Object(a.useState)(),I=Object(m.a)(F,2),S=I[0],N=I[1];return c.a.createElement(c.a.Fragment,null,c.a.createElement(s.a,{container:!0,justify:"center",alignItems:"center",style:{minHeight:"90vh",display:"flex"}},c.a.createElement(s.a,{item:!0,direction:"column",alignItems:"center",justify:"center",style:{minHeight:"90vh",display:"flex"}},c.a.createElement(u.a,{elevation:10,style:{paddingTop:"6rem",paddingBottom:"6rem",minWidth:"60vw"}},c.a.createElement(s.a,{container:!0,direction:"column",spacing:8,alignItems:"center",justify:"center"},c.a.createElement(s.a,{item:!0,xs:12,sm:10,lg:8,container:!0,alignItems:"center",spacing:2},c.a.createElement(s.a,{item:!0,xs:12,md:8},c.a.createElement(h.a,{type:"text",label:"Username",variant:"filled",value:n,onChange:function(e){return r(e.target.value)}})),c.a.createElement(s.a,{item:!0,xs:12,md:4},c.a.createElement(p.a,{variant:"contained",color:"primary",onClick:function(){fetch("https://api.github.com/users/".concat(n,"/repos")).then((function(e){return e.json()})).then((function(e){d(e)}))}},"Fetch Repos for User"))),E?c.a.createElement(c.a.Fragment,null,c.a.createElement(s.a,{item:!0,xs:12,sm:10,lg:8,container:!0,alignItems:"center",spacing:2},c.a.createElement(s.a,{item:!0,xs:12,md:8},c.a.createElement(g.a,{onChange:function(e){return y(e.target.value)},value:j||"None"},c.a.createElement(f.a,{value:"None",disabled:!0},"None"),E.map((function(e,t){return c.a.createElement(f.a,{key:t,value:e.name},e.name)})))),c.a.createElement(s.a,{item:!0,xs:12,md:4},c.a.createElement(p.a,{variant:"contained",color:"primary",onClick:function(){fetch("https://api.github.com/repos/".concat(n,"/").concat(j,"/branches?per_page=100")).then((function(e){return e.json()})).then((function(e){C(e)}))}},"Fetch Branches for Selected Repo")))):null,k?c.a.createElement(c.a.Fragment,null,c.a.createElement(s.a,{item:!0,xs:12,sm:10,lg:8,container:!0,alignItems:"center",spacing:2},c.a.createElement(s.a,{item:!0,xs:12,md:8},c.a.createElement(g.a,{onChange:function(e){return N(e.target.value)},value:S||"None"},c.a.createElement(f.a,{value:"None",disabled:!0},"None"),k.map((function(e,t){return c.a.createElement(f.a,{key:t},e.name)})))),c.a.createElement(s.a,{item:!0,xs:12,md:4},c.a.createElement(p.a,{variant:"contained",color:"primary",onClick:function(){k.forEach((function(e){var t=e.name===S&&e.commit.sha;t&&fetch("https://api.github.com/repos/".concat(n,"/").concat(j,"/commits?per_page=100&sha=").concat(t)).then((function(e){return e.json()})).then((function(e){var t=[],a=[],c=e;t.push.apply(t,Object(o.a)(c));var r=c.length-1,l=c[r].sha;a.push(l);!function e(){l=a[a.length-1],fetch("https://api.github.com/repos/".concat(n,"/").concat(j,"/commits?per_page=100&sha=").concat(l)).then((function(e){return e.json()})).then((function(n){r=(c=n).length-1,l=c[r].sha,a.push(l),(a[a.length-1]!==a[a.length-2]||a.length<2)&&(c.shift(),t.push.apply(t,Object(o.a)(c)),e())}))}(),console.log(t)}))}))}},"Fetch Commits for Selected Branch")))):null)))))}),d=function(){return c.a.createElement(c.a.Fragment,null,c.a.createElement(i.c,null,c.a.createElement(i.a,{path:"/"},c.a.createElement(E,null))))};Object(r.render)(c.a.createElement(l.a,null,c.a.createElement(d,null)),document.getElementById("root"))}},[[55,1,2]]]);
//# sourceMappingURL=main.275e8352.chunk.js.map