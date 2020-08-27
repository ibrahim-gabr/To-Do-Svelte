<button on:click={additem} class="btn btn-large additem">
  <i class="fa fa-plus bg-success rounded-circle p-3 text-white"></i>
</button>


<div class="container">
    <table class="table table-dark mt-4 table-bordered ">
  <thead>
    <tr class="d-flex">
      <th scope="col" class="col-7" >Task</th>
      <th scope="col" class="col-1" >Completed</th>
      <th scope="col" class="col-2" >Due Date</th>
      <th scope="col" class="col-2" >Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each items as item}
     <tr class="d-flex">
      <td class="col-7">{item.content}</td>
      <td class="col-1">{item.completed}</td>
      <td class="col-2">
          {#if item.due_date}
          {item.due_date}
          {:else}
            no date set
          {/if}
        </td>
      <td class="col-2 d-flex">
         <div class="ml-2 " on:click={editItem(item.id,item.content,item.completed,item.due_date)}>
              <i class="fa fa-edit " title="edit"></i>
         </div>
         <div class="ml-2">
            <i class="fa fa-check " on:click={() => item.completed = true} title="mark as done"></i>
         </div>
         <div class="ml-2" on:click={deleteItem(item.id)}>
            <i class="fa fa-trash " title="delete"></i>
         </div>
      </td>
    </tr>
    {/each}

  </tbody>
</table>
</div>

<!-- modal to add items -->
<div class="modal" id="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-success text-white">
        <h5 class="modal-title">Add New To Do Item</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <!-- form -->
       <form >
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">To Do Item</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" bind:value={content}>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Due Date</label>
                <input type="date" class="form-control" id="exampleInputPassword1" bind:value={due_date}>
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" bind:checked={completed}>
                <label class="form-check-label" for="exampleCheck1">Completed status</label>
            </div>
            <button on:click|preventDefault={addItemDb}  data-dismiss="modal" type="submit" class="btn btn-success">Add Item</button>
            </form>
      </div>

    </div>
  </div>
</div>

<!-- modal to edit and update data -->
<div class="modal" id="modal1" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-success text-white">
        <h5 class="modal-title">Add New To Do Item</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <!-- form -->
       <form >
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">To Do Item</label>
                <input type="text" class="form-control" id="updatecontet" aria-describedby="emailHelp" bind:value={content}>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Due Date</label>
                <input type="date" class="form-control" id="updatedate" bind:value={due_date}>
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="updatedone" bind:checked={completed}>
                <label class="form-check-label" for="exampleCheck1">Completed status</label>
            </div>
            <button on:click|preventDefault={updateItem} data-dismiss="modal" type="submit" class="btn btn-success">Save Changes</button>
            </form>
      </div>

    </div>
  </div>
</div>
<style>
.additem{
    position: fixed;
    right: 3rem;
    bottom: 2rem;
}
</style>

<script>
    import {db} from './firebase.js'
    import { onMount } from 'svelte';
    
    let items = []
    let content = ''
    let completed = false;
    let due_date = null
    let docid = null

    

    const additem = () => {
         content = ''
         completed = false;
         due_date = null
         
        var myModal = document.getElementById('modal')
        var modal = new bootstrap.Modal(myModal)
        modal.toggle()
    }
    const addItemDb = () => {
        if (due_date != null) {
           due_date = new Date(due_date).getTime()
        } else {
            due_date = due_date
        }
        console.log(completed)
        db.collection('Todo').add({completed , content , due_date})
        getItems();
    }

    const deleteItem = (e) => {
        db.collection('Todo').doc(e).delete()
        getItems();
    }

    function editItem (id,text,done,date){
        content = text
        completed = done
        due_date = date
        docid = id
        var myModal = document.getElementById('modal1')
        var modal = new bootstrap.Modal(myModal)
        modal.toggle()

    }

    function updateItem(){

        content = document.getElementById('updatecontet').value


        if(document.getElementById('updatedate').value){
        due_date = document.getElementById('updatedate').value
        }else{
            due_date = null
        }
        db.collection('Todo').doc(docid).update({
            'content':content,
            'due_date':due_date,
            'completed':completed
        })

      getItems();
    }


    function getItems (){
               let itemres=[]
             db.collection("Todo").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                const result = {
                    id:doc.id,
                    content:doc.data().content,
                    due_date:doc.data().due_date,
                    completed:doc.data().completed,
                }

                if(result.due_date){
                result.due_date= new Date(result.due_date).toLocaleString()

                }
                 itemres.push(result)
            });
              items = itemres
        });
       
    }

  onMount( async () => {
    await getItems()
});
    
</script>