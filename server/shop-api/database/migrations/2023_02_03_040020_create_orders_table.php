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
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->string('reference')->unique();
            $table->integer('courier_id')->unsigned()->index();
            $table->foreign('courier_id')->references('id')->on('couriers');
            $table->string('courier');
            $table->integer('customer_id')->unsigned()->index();
            $table->foreign('customer_id')->references('id')->on('customers');
            $table->integer('address_id')->unsigned()->index();
            $table->foreign('address_id')->references('id')->on('addresses');
            $table->integer('order_status_id')->unsigned()->index();
            $table->foreign('order_status_id')->references('id')->on('order_statuses');
            $table->string('payment');
            $table->decimal('discounts')->default(0.00);
            $table->decimal('total_products');
            $table->decimal('total_shipping')->default(0.00);
            $table->decimal('tax')->default(0.00);
            $table->decimal('total');
            $table->decimal('total_paid')->default(0.00);
            $table->string('invoice')->nullable();
            $table->string('label_url')->nullable();
            $table->string('tracking_number');
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
        Schema::dropIfExists('orders');
    }
};
