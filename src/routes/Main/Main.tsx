import * as React from 'react';
import Cards from '../../components/Cards';
class Main extends React.Component {
  public render() {
    var session = {
      votes: [{ value: '3' }, { value: '5' }],
      sessionId: 'id'
    };
    return (
      <div>
        <h2>Main Page</h2>
        <Cards votes={session['votes']} />
        {/* <card-flipper /> */}
      </div>
    );
  }
}

export default Main;
