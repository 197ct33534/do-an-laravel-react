<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mst_product', function (Blueprint $table) {
            $table->string('product_id', 20)->primary()->unique();
            $table->integer('category_id');
            $table->integer('brand_id');
            $table->string('product_name');
            $table->string('product_image')->nullable();
            $table->decimal('product_price')->default('0');
            $table->boolean('gender', 1);
            $table->string('sku', 191);
            $table->boolean('is_show', 1);
            $table->boolean('is_new', 1);
            $table->boolean('is_sales', 1)->default('1');
            $table->text('description')->nullable();
            $table->integer('qty');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mst_product');
    }
};
