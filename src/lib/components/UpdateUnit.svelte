<script>
  import ActiveRecord from "$lib/models/ActiveRecord";

  import Fieldset from "./Fieldset.svelte";
  export let index;
  export let product;
  export let handler;
  const updateProduct = async (e) => {
    const response = await ActiveRecord.send(e.target, { product });
    if (!response.error) handler(response.data);
  };
</script>

<form
  action={`/products/${product._id}.json`}
  method="post"
  on:submit|preventDefault={updateProduct}
>
  <h2>{product.unitProducts[index].unit.name}</h2>
  <Fieldset
    title="Cantidad"
    bind:input={product.unitProducts[index].quantity}
    name={`product[unit][${index}][quantity]`}
    type="number"
    required
    min="0"
  />
  <Fieldset
    title="Precio de compra"
    bind:input={product.unitProducts[index].buyPrice}
    name={`product[unit][${index}][buyPrice]`}
    type="number"
    step="0.01"
    required
    min="0"
  />
  <Fieldset
    title="Precio de venta"
    bind:input={product.unitProducts[index].sellPrice}
    name={`product[unit][${index}][sellPrice]`}
    type="number"
    required
    step="0.01"
    min="0"
  />
  <Fieldset
    title="Precio de venta - Juliaca"
    bind:input={product.unitProducts[index].otherPrice}
    name={`product[unit][${index}][otherPrice]`}
    type="number"
    required
    step="0.01"
    min="0"
  />
  <button class="inverted" style="--color: green">Guardar</button>
</form>
