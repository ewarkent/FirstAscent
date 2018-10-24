// Redoing form submission based on tutorials

var DonationForm = React.createClass({
  getInitialState: function() {
    return {
      contributor: "",
      amount: undefined,
      comment: "",
      email: "",
      department: undefined
    };
  },
  handleSubmit: function(e) {
    //we don't want the form to submit, so we prevent the default behavior
    e.preventDefault();
    
    var contributor = this.state.contributor.trim();
    var amount = this.state.amount;
    var comment = this.state.comment.trim();
    if (!contributor || !amount) {
      return;
    }
    
    //Here we do the final submit to the parent component
    this.props.onDonationSubmit({contributor: contributor, amount: amount, comment: comment});
    this.setState({
      contributor: '',
      amount: undefined,
      comment: '',
      email: '',
      department: undefined
    });
  },
  validateEmail: function (value) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  },
  validateDollars: function (value) {
    //will accept dollar amounts with two digits after the decimal or no decimal
    //will also accept a number with or without a dollar sign
    var regex  = /^\$?[0-9]+(\.[0-9][0-9])?$/;
    return regex.test(value);
  },
  commonValidate: function () {
    //you could do something here that does general validation for any form field
    return true;
  },
  setValue: function (field, event) {
    //If the input fields were directly within this
    //this component, we could use this.refs.[FIELD].value
    //Instead, we want to save the data for when the form is submitted
    var object = {};
    object[field] = event.target.value;
    this.setState(object);
  },
  render: function() {
    //Each form field is actually another component.
    //Two of the form fields use the same component, but with different variables
    return (
      <form className="donationForm" onSubmit={this.handleSubmit}>
        <h2>University Donation</h2>
      
        <TextInput
          value={this.state.email}
          uniqueName="email"
          text="Email Address"
          textArea={false}
          required={true}
          minCharacters={6}
          validate={this.validateEmail}
          onChange={this.setValue.bind(this, 'email')} 
          errorMessage="Email is invalid"
          emptyMessage="Email is required" />
        <br /><br />
 
        <TextInput
          value={this.state.contributor}
          uniqueName="contributor"
          text="Your Name"
          textArea={false}
          required={true}
          minCharacters={3}
          validate={this.commonValidate}
          onChange={this.setValue.bind(this, 'contributor')} 
          errorMessage="Name is invalid"
          emptyMessage="Name is required" />
        <br /><br />
          
        <TextInput
          value={this.state.comment}
          uniqueName="comment"
          text="Is there anything you'd like to say?"
          textArea={true}
          required={false}
          validate={this.commonValidate}
          onChange={this.setValue.bind(this, 'comment')} 
          errorMessage=""
          emptyMessage="" />
        <br /><br />
      
        {/* This Department component is specialized to include two fields in one */}
        <h4>Where would you like your donation to go?</h4>
        <Department
          value={this.state.department} 
          onChange={this.setValue.bind(this, 'department')} />
        <br /><br />
      
        {/* This Radios component is specialized to include two fields in one */}
        <h4>How much would you like to give?</h4>
        <Radios
          value={this.state.amount}
          values={[10, 25, 50]}
          name="amount"
          addAny={true}
          anyLabel=" Donate a custom amount"
          anyPlaceholder="Amount (0.00)"
          anyValidation={this.validateDollars}
          onChange={this.setValue.bind(this, 'amount')} 
          anyErrorMessage="Amount is not a valid dollar amount"
          itemLabel={' Donate $[VALUE]'} />
        <br /><br />
      
        <h4>Payment Information</h4>
        <Payment />
        <br />
      
        <input type="submit" value="Submit" />
      </form>
    );
  }
});