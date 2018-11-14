<template>
   <div id="app">
      <h1>PETstock FED Test</h1>
      <ul>
      <li class="titleclass">Categories</li>
      <li class="sortclass titleclass">Sort By Price </li>
      </ul>
      <ul >
         <li v-for="data in categories"><a href="#" v-on:click="setSelectedCategody(data.slug)">{{data.name}}</a></li>
         <li><a href="#" v-on:click="setSelectedCategody('ALL')">ALL</a></li>
         <li class="sortclass"><a href="#" v-on:click="setSelectedCategody('LOW')" > Sort Low to High</a></li>
         <li class="sortclass"><a href="#" v-on:click="setSelectedCategody('HIGH')" > Sort High to Low</a></li>
      </ul>
      <div class="results">
         <div class="result-style">
            <span>Found </span>{{size}} <span>results</span>
         </div>
         <section id="content" class="products">
            <div class="bucket product-card" v-for="data in filteredProducts ">
               <div class="sale-ind"><img :src="data.saleimg"></div>
               <div > <a :href="data.href"> <img :src="data.img" class="product-image"> </a> </div>
               <figcaption class="product-info"> {{data.name}}</figcaption>
               <figcaption class="product-info-retail">was {{data.retailPrice}}</figcaption>
               <h3 v-if="salePrice !== null" class="product-info-less">{{data.salePrice}}</h3>
            </div>
         </section>
      </div>
   </div>
</template>
<script>
   import response from './data.json';
     import _ from 'lodash';
   
   export default {
     name: 'app',
   
     components: {
     },
     data() {
   
       return {
         categories: response.categories,
         products: response.products,
         selectedCategory: 'ALL',
         sortOrder: null,
         size:response.products.length,
         salePrice:response.products.salePrice
       };
     },
     computed: {
    filteredProducts: function() {
   			var category = this.selectedCategory;
   			if(category === 'ALL') {
   				return this.products;
   			} 
   
       else if (category=='LOW'){
         return _.orderBy(this.products,['salePrice'],['asc']);
       }
   
        else if (category=='HIGH'){
         return _.orderBy(this.products,['salePrice'],['desc']);
       }
       else {
           this.products=this.products.filter(function(data){
               return data.category===category
           })
           this.size=this.products.length;
           return this.products;
   		}
   	},
   
     },
   
     methods: {  
      setSelectedCategody: function(selectedCategory) {
        this.selectedCategory=selectedCategory
        this.products=response.products;
        
      },
      sortAscending:function(){
        _.orderBy(this.products,['salePrice'],['asc']);
      }
   }
   }
</script>
<style lang="scss">
   $size-mobile-max: 37.5rem;
   $size-large: 2 * $size-mobile-max;
   $color-gray: #6B6B6B;
   $color-white: #fefefe;
   $color-sale: #82B366;
   $color-controls: #3333FF;
   $font-family: Helvetica, Arial, sans-serif;
   $product-align:text-center;
   $product-spacing:10px;
   $img-size:170px;
   #app {
   * {
   -moz-box-sizing: border-box;
   -webkit-box-sizing: border-box;
   box-sizing: border-box;
   font-family:$font-family;
   }
   body {
   font: 14px Helvetica, Sans-Serif; line-height: 24px; color: #a6a6a6;
   background: #fff ;
   height:100%;
   }

  
   .result-style{
   padding:15px;
   color:  $color-sale;
   }

   .product-image{
     width:$img-size
   }
   
   #content {
   overflow: hidden; clear: both;
   }
   #content .bucket {
    float: left; 
    margin: 0 0 48px 20px;
   border: 1px solid #262626;
   }
   
   ul {
   list-style-type: none;
   padding: 0;
   margin: 0;
   overflow: hidden;
   background-color:  $color-controls;
li {
   float: left;
   a {
   display: block;
   color: $color-white;
   padding: 8px 16px;
   text-decoration: none;
   text-align: center;
   }
   a:hover {
   background-color: #555;
   color: white;
   }
   }
   }
   .sortclass{
     float:right;
   }
   .sale-ind {
   top:5px;
   right:5px;
   z-index:5;
   width:100px
   }

  .titleclass{
  display: block;
   color: $color-sale;
   padding: 8px 16px;
   text-align: center;
  }

   .results > ul {
   border: 1px solid green;
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   }
   .product h3 {
   padding:10px 0;
   font:bold 18px/1.5 Tahoma, Geneva, sans-serif;
   color:#505b4d;
   }
   .product p {
   font:normal 12px/1.5 Tahoma, Geneva, sans-serif;
   color:#4f4f4f;
   padding:0 0 20px 0;
   }
   @media screen and (max-width: $size-mobile-max) {
.product-card {
  flex:1 26%;
   }
   .product-image{
     width:$img-size/2;
   }
   
   }
  @media screen and (min-width: $size-large)  {
.product-card {
  flex:1 21%;
   }

   }
   
   .products {
   display: flex;
   flex-wrap: wrap;
   }
   .product-card {
   display: flex;
   flex-direction: column;
   padding: 2%;
   background-color: #FFF;
   box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.25);
   }
   
   .product-info {
   margin-top: auto;
   padding-top: 20px;
   text-align: center;
   }
   .product-info-retail{
   text-align:center;
   color: #a6a6a6;
   }
   .product-info-less {
   margin-top: auto;
   padding-top: 10px;
   text-align: center;
   color:#008000;
   }
  
   
   }
</style>
