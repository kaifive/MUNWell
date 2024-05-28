(this.webpackJsonpmunwell=this.webpackJsonpmunwell||[]).push([[24],{638:function(e,t,i){"use strict";i.r(t);var c=i(0),a=i(121),s=i(519),n=i(531),o=i(524),r=i(563),l=i(523),j=i(3);const d=["division","category","committee","abbreviation","download"],b=["delegation","contact","email","download"];t.default=()=>{const{user:e}=Object(a.b)(),{isAuthenticated:t}=Object(a.b)(),[i,m]=Object(c.useState)(!1),[O,h]=Object(c.useState)({type:"",delegate:"",position:"",delegation:"",committee:""}),[g,x]=Object(c.useState)({registrationData:[],committeeData:[],awardTypes:[],settings:[]}),[p,w]=Object(c.useState)(!0);function u(){h({position:"",delegation:"",committee:""}),m(!i)}return t&&async function(){await Object(o.a)("/api/get/committee",e.sub).then((e=>{JSON.stringify(e)!==JSON.stringify(g.committeeData)&&x((t=>({...t,committeeData:e})))})),await Object(o.a)("/api/get/registrationData",e.sub).then((e=>{JSON.stringify(e)!==JSON.stringify(g.registrationData)&&x((t=>({...t,registrationData:e})))})),await Object(o.a)("/api/get/settings",e.sub).then((e=>{JSON.stringify(e[e.length-1])!==JSON.stringify(g.settings)&&x((t=>({...t,settings:e[e.length-1]})))})),await Object(o.a)("/api/get/awardType",e.sub).then((e=>{JSON.stringify(e)!==JSON.stringify(g.awardTypes)&&x((t=>({...t,awardTypes:e})))}))}().then((()=>{p&&w(!1)})),p?Object(j.jsx)("p",{children:"Waiting for Data..."}):Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(s.S,{children:Object(j.jsx)(s.l,{children:Object(j.jsxs)(s.g,{children:[Object(j.jsx)(s.k,{children:"Participation Awards by Committee"}),Object(j.jsxs)(s.h,{children:[Object(j.jsx)(s.S,{className:"align-items-left",children:Object(j.jsx)(s.l,{lg:"3",children:Object(j.jsx)(s.f,{block:!0,color:"primary",onClick:()=>u(),children:"Custom Participation Award"})})}),Object(j.jsx)("br",{}),Object(j.jsx)(s.p,{items:g.committeeData,fields:d,hover:!0,striped:!0,sorter:!0,itemsPerPage:10,pagination:!0,scopedSlots:{download:e=>Object(j.jsx)("td",{children:Object(j.jsx)(s.f,{block:!0,color:"primary",onClick:()=>Object(n.f)(e,"Committee",g.settings,g.committeeData),children:"Download"})})}})]})]})})}),Object(j.jsx)(s.S,{children:Object(j.jsx)(s.l,{children:Object(j.jsxs)(s.g,{children:[Object(j.jsx)(s.k,{children:"Participation Awards by Delegation"}),Object(j.jsxs)(s.h,{children:[Object(j.jsx)(s.S,{className:"align-items-left",children:Object(j.jsx)(s.l,{lg:"3",children:Object(j.jsx)(s.f,{block:!0,color:"primary",onClick:()=>u(),children:"Custom Participation Award"})})}),Object(j.jsx)("br",{}),Object(j.jsx)(s.p,{items:g.registrationData,fields:b,hover:!0,striped:!0,sorter:!0,itemsPerPage:10,pagination:!0,scopedSlots:{download:e=>Object(j.jsx)("td",{children:Object(j.jsx)(s.f,{block:!0,color:"primary",onClick:()=>Object(n.f)(e,"Delegation",g.settings,g.committeeData),children:"Download"})})}})]})]})})}),Object(j.jsxs)(s.N,{show:i,onClose:m,size:"lg",children:[Object(j.jsx)(s.Q,{children:Object(j.jsx)(s.R,{children:"Create Custom Participation Award"})}),Object(j.jsx)(s.O,{children:Object(j.jsxs)(s.w,{action:"",method:"post",encType:"multipart/form-data",className:"form-horizontal",children:[Object(j.jsxs)(s.x,{row:!0,children:[Object(j.jsx)(s.l,{md:"3",children:Object(j.jsx)(s.L,{htmlFor:"award-committee",children:"Committee"})}),Object(j.jsx)(s.l,{xs:"12",md:"8",children:Object(j.jsx)(s.T,{custom:!0,name:"awardCommittee",value:O.committee,onChange:e=>{const t=e.target.value;h((e=>({...e,committee:t})))},children:Object(r.b)(g.committeeData)})})]}),Object(j.jsxs)(s.x,{row:!0,children:[Object(j.jsx)(s.l,{md:"3",children:Object(j.jsx)(s.L,{htmlFor:"award-pos",children:"Position"})}),Object(j.jsx)(s.l,{xs:"12",md:"8",children:Object(j.jsx)(s.E,{name:"awardPos",placeholder:"Position",value:O.position,onChange:e=>{const t=e.target.value;h((e=>({...e,position:t})))}})})]}),Object(j.jsxs)(s.x,{row:!0,children:[Object(j.jsx)(s.l,{md:"3",children:Object(j.jsx)(s.L,{htmlFor:"award-delegation",children:"Delegation"})}),Object(j.jsx)(s.l,{xs:"12",md:"8",children:Object(j.jsx)(s.T,{custom:!0,name:"awardDelegation",value:O.delegation,onChange:e=>{const t=e.target.value;h((e=>({...e,delegation:t})))},children:Object(r.c)(g.registrationData)})})]})]})}),Object(j.jsxs)(s.P,{children:[Object(j.jsx)(s.f,{color:"secondary",onClick:()=>m(!1),children:"Cancel"}),Object(j.jsx)(s.f,{color:"primary",onClick:()=>(Object(l.a)(e.sub).then((e=>{if(0===e)alert("No valid MUNWell License found! \nUpload a valid MUNWell License to be able to configure data.");else{let e,t=O;for(e=0;e<g.committeeData.length;e++)JSON.stringify(t.committee)===JSON.stringify(g.committeeData[e].committee)&&(t.chair=g.committeeData[e].chair);Object(n.d)(t,g.settings)}})),void m(!1)),children:"Download"})]})]})]})}}}]);
//# sourceMappingURL=24.1982dbdb.chunk.js.map