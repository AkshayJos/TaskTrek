import React from "react";
import { Card, CardHeader } from "reactstrap";

const Header = () => {
  return (
    <div>
      <Card className="my-3" color="warning">
        <CardHeader>
          <h1 className="text-center my-4" outline = "true">
            Welcome to TaskTrek
          </h1>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Header;
