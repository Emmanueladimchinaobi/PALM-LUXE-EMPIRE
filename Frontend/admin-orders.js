console.log("Admin Orders Loaded");

async function loadOrders() {
    try {
        const response = await fetch("https://adimchi-jersery-store-1.onrender.com/api/orders");

        if (!response.ok) {
            throw new Error("Failed to fetch orders");
        }

        const orders = await response.json();

        const container = document.getElementById("orders");
        container.innerHTML = "";

        if (orders.length === 0) {
            container.innerHTML = `
                <div class="bg-white shadow rounded-lg p-8 text-center">
                    <h2 class="text-2xl font-bold">No Orders Yet</h2>
                </div>
            `;
            return;
        }

        orders.forEach(order => {

            let itemsHTML = "";

            order.items.forEach(item => {

                itemsHTML += `
                    <div class="flex gap-4 border rounded-lg p-4 mt-4">

                        <img
                            src="${item.image}"
                            class="w-20 h-20 rounded object-cover"
                            alt="${item.name}"
                        >

                        <div class="flex-1">

                            <h3 class="font-bold text-lg">
                                ${item.name}
                            </h3>

                            <p>Size: ${item.size}</p>

                            <p>Quantity: ${item.quantity}</p>

                            <p class="font-semibold">
                                ₦${item.price.toLocaleString()}
                            </p>

                        </div>

                    </div>
                `;

            });

            container.innerHTML += `

                <div class="bg-white shadow-lg rounded-xl p-6 mb-8">

                    <div class="flex justify-between items-start">

                        <div>

                            <h2 class="text-2xl font-bold">
                                ${order.customerName}
                            </h2>

                            <p class="text-gray-600">
                                ${order.phone}
                            </p>

                            <p class="text-gray-600">
                                ${order.address}
                            </p>

                        </div>

                        <div class="text-right">

                            <p class="font-semibold">
                                Total
                            </p>

                            <h2 class="text-3xl font-bold text-green-600">
                                ₦${order.total.toLocaleString()}
                            </h2>

                        </div>

                    </div>

                    ${itemsHTML}

                    <div class="mt-6 flex flex-wrap gap-3">

                        <span class="bg-yellow-200 px-4 py-2 rounded-full font-medium">
                            Payment: ${order.paymentStatus}
                        </span>

                        <span class="bg-blue-200 px-4 py-2 rounded-full font-medium">
                            Order: ${order.orderStatus}
                        </span>

                    </div>

                    <div class="mt-6 text-sm text-gray-500">

                        Ordered on:
                        ${new Date(order.createdAt).toLocaleString()}

                    </div>

                </div>

            `;

        });

    } catch (error) {

        console.error(error);

        document.getElementById("orders").innerHTML = `
            <div class="bg-red-100 text-red-700 p-6 rounded-lg">
                Failed to load orders.
                <br><br>
                ${error.message}
            </div>
        `;
    }
}

loadOrders();