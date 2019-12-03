import React, { Component } from 'react';
import { Jumbotron, Container, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

import AppNavBar from '../components/AppNavBar.js';
import AdminInfo from './components/AdminInfo.js';
import AdminEvents from './components/AdminEvents.js';
import AdminGalleries from './components/AdminGalleries.js';
import AdminContact from './components/AdminContact.js';
import AdminAccount from './components/AdminAccount.js';

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1'
    }
  }

  setActiveTab = tab => this.setState({ activeTab: tab });
  toggle = tab => { if(this.state.activeTab !== tab) this.setActiveTab(tab); }
  
  render() {
    const { activeTab } = this.state;
    return (
      <div>
        <AppNavBar/>
        <Container className="d-flex flex-column justify-content-center">
          <Jumbotron className="m-4" style={{minWidth: 300, maxWidth: "100%"}}>
            <h4 className="display-4">Ajustes de la web</h4>
            <hr className="my-2" />
            
            <Nav tabs>
              <NavItem>
                <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                  Información
                </NavLink>
              </NavItem>
              
              <NavItem>
                <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                  Eventos
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { this.toggle('3'); }}>
                  Galerias
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className={classnames({ active: activeTab === '4' })} onClick={() => { this.toggle('4'); }}>
                  Contacto
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className={classnames({ active: activeTab === '5' })} onClick={() => { this.toggle('5'); }}>
                  Cuenta
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="1"><AdminInfo/></TabPane>
              <TabPane tabId="2"><AdminEvents/></TabPane>
              <TabPane tabId="3"><AdminGalleries/></TabPane>
              <TabPane tabId="4"><AdminContact/></TabPane>
              <TabPane tabId="5"><AdminAccount/></TabPane>
            </TabContent>
          </Jumbotron>
        </Container>
      </div>
    )
  }
}

export default Admin;
