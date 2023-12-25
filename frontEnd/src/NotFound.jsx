import { Button, Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="pageNotFound">
        <Row>
            <Col>
                <Link to="/" className="link">
                    <Button>
                        Not Found
                    </Button>
                </Link>
            </Col>
        </Row>
    </div>
  )
}

export default NotFound