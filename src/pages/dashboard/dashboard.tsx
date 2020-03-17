import React from "react";
import "./dashboard.scss";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router";

const Dashboard: React.FC = () => {
  const history = useHistory();

  const goTo = (link: string) => {
    history.push(link);
  };

  const links: string[][] = [
    ["/orders", "物品管理", "包括物品搜索，物品列表和详情页面。"],
    ["/customer", "客户管理", "包括客户搜索，客户列表和详情页面。"],
    ["/courier/detail", "骑手管理", "包括骑手创建和骑手信息页面。"],
    [
      "/agent",
      "代理管理",
      "包括代理搜索，详情页面，创建代理，和代理的commission设置功能。"
    ],
    ["/client/home", "客户端Home", "包括客户端CMS的Home轮播图管理功能。"],
    [
      "/client/case",
      "客户端Our Case",
      "包括客户端CMS的Our Case相关的管理功能。"
    ],
    ["/labelone", "价格服务", "包括7个级别的物品分类与价格设置。"],
    ["/fqa/search", "FQA管理", "包括客户端CMS的FQA相关的管理功能。"]
  ];

  return (
    <div className="dashboard">
      {links.map((link: string[], index: number) => {
        return (
          <Card
            bg="light"
            key={index}
            text="dark"
            className="m-3 dashboard-card"
          >
            <Card.Header
              onClick={() => {
                goTo(link[0]);
              }}
              className="dashboard-card_header"
            >
              <b>{link[1]}</b>
            </Card.Header>
            <Card.Body className="dashboard-card_body">
              <Card.Text>{link[2]}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default Dashboard;
