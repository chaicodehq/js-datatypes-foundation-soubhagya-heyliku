/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  // Your code here
  if (typeof thali !== "object" || thali === null || Array.isArray(thali)) {
    return "";
  }
  if (
    typeof thali.name !== "string" ||
    typeof thali.price !== "number" ||
    typeof thali.isVeg !== "boolean" ||
    !Array.isArray(thali.items)
  ) {
    return "";
  }
  let dishMenu = `${thali.name.toUpperCase()} (${thali.isVeg ? "Veg" : "Non-Veg"}) - Items: ${thali.items.join(", ")} - Rs.${thali.price.toFixed(2)}`;
  return dishMenu;
}

export function getThaliStats(thalis) {
  // Your code here
  if (!Array.isArray(thalis) || thalis.length === 0) {
    return null;
  }
  const totalThalis = thalis.length;
  const vegCount = thalis.filter((i) => i.isVeg === true).length;
  const nonVegCount = thalis.filter((i) => i.isVeg === false).length;
  const totalPrice = thalis.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);
  const avgPrice = (totalPrice / thalis.length).toFixed(2);
  const cheapest = Math.min(...thalis.map((i) => i.price));
  const costliest = Math.max(...thalis.map((i) => i.price));
  const names = thalis.map((i) => i.name);

  return {
    totalThalis: totalThalis,
    vegCount: vegCount,
    nonVegCount: nonVegCount,
    avgPrice: avgPrice,
    cheapest: cheapest,
    costliest: costliest,
    names: names,
  };
}

export function searchThaliMenu(thalis, query) {
  // Your code here
  if (!Array.isArray(thalis) || typeof query !== "string" || query === "") {
    return [];
  }
  query = query.toLowerCase();

  return thalis.filter((i) => {
    if (i.name.toLowerCase().includes(query)) {
      return true;
    } else if (
      i.items.some((ele) => 
        ele.toLowerCase().includes(query)
      )
    ) {
      return true;
    } else {
      return false;
    }
  });
}

export function generateThaliReceipt(customerName, thalis) {
  // Your code here
  if(typeof customerName !== "string" || customerName === "" || !Array.isArray(thalis) || thalis.length === 0) {
    return "";
  }
  let customer = customerName.toUpperCase();
  let lineItems = thalis.map(i => `- ${i.name} x Rs.${i.price}`)
  let totalBill = thalis.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0)
  let countItems = thalis.length
  return `THALI RECEIPT\n---\nCustomer: ${customer}\n${lineItems.join("\n")}\n---\nTotal: Rs.${totalBill}\nItems: ${countItems}`
  
}
